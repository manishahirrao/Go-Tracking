const AFTERSHIP_BASE_URL = 'https://api.aftership.com/v4';

function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...extraHeaders,
    },
  });
}

// Rate limiting with automatic cleanup
const RATE_LIMIT = 10; // requests per minute
const rateLimitMap = new Map();

function cleanupRateLimit() {
  const now = Date.now();
  const cutoff = now - 60000;
  
  for (const [ip, requests] of rateLimitMap.entries()) {
    const recent = requests.filter(time => time > cutoff);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}

function checkRateLimit(clientIP) {
  const now = Date.now();
  const requests = rateLimitMap.get(clientIP) || [];
  const recentRequests = requests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(clientIP, recentRequests);
  
  // Periodic cleanup (every ~100 requests)
  if (Math.random() < 0.01) {
    cleanupRateLimit();
  }
  
  return true;
}

async function getOrCreateTracking(trackingNumber, courier, apiKey) {
  console.log('getOrCreateTracking called:', { trackingNumber, courier, apiKey: apiKey ? 'exists' : 'missing' });
  
  try {
    // Just try POST first to create tracking
    const createUrl = `${AFTERSHIP_BASE_URL}/trackings`;
    const createBody = {
      tracking: {
        tracking_number: trackingNumber
      }
    };
    
    // Add courier slug only if provided
    if (courier) {
      createBody.tracking.slug = courier;
    }
    
    console.log('POST URL:', createUrl);
    console.log('POST body:', JSON.stringify(createBody));
    
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'aftership-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createBody)
    });
    
    console.log('POST response status:', createRes.status);
    
    const createJson = await createRes.json().catch(() => ({}));
    console.log('POST response:', createJson);
    
    // If create succeeded, return the created tracking
    if (createRes.ok && createJson?.data?.tracking) {
      return createJson;
    }
    
    // If tracking already exists (4003 or 4004 error codes), fetch it
    const errorCode = createJson?.meta?.code;
    if (errorCode === 4003 || errorCode === 4004 || createRes.status === 409) {
      console.log('Tracking already exists, fetching it');
      const getUrl = `${AFTERSHIP_BASE_URL}/trackings/${encodeURIComponent(trackingNumber)}`;
      
      const getRes = await fetch(getUrl, {
        method: 'GET',
        headers: {
          'aftership-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      });
      
      if (!getRes.ok) {
        const getJson = await getRes.json().catch(() => ({}));
        throw new Error(getJson?.meta?.message || 'Failed to fetch tracking');
      }
      
      return await getRes.json();
    }
    
    // Other errors
    throw new Error(createJson?.meta?.message || 'Failed to create tracking');
    
  } catch (error) {
    console.error('Error in getOrCreateTracking:', error);
    throw error;
  }
}

async function handleTrackRequest(request, env) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return jsonResponse({}, 204);
  }
  
  if (request.method !== 'GET') {
    return jsonResponse({ success: false, error: 'Method not allowed' }, 405);
  }
  
  const requestUrl = new URL(request.url);
  const trackingId = (requestUrl.searchParams.get('trackingId') || '').trim();
  const courier = (requestUrl.searchParams.get('courier') || '').trim() || null;
  
  if (!trackingId) {
    return jsonResponse(
      { success: false, error: 'Tracking ID is required' },
      400
    );
  }
  
  // Rate limiting
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (!checkRateLimit(clientIP)) {
    return jsonResponse(
      { 
        success: false, 
        error: 'Too many requests. Please try again later.',
        retryAfter: 60 
      },
      429,
      { 'Retry-After': '60' }
    );
  }
  
  if (!env.AFTERSHIP_API_KEY) {
    console.log('API KEY MISSING from env');
    return jsonResponse(
      { success: false, error: 'Service temporarily unavailable - API key missing' },
      500
    );
  }
  
  console.log('API KEY exists:', env.AFTERSHIP_API_KEY.substring(0, 10) + '...');
  
  try {
    const json = await getOrCreateTracking(trackingId, courier, env.AFTERSHIP_API_KEY);
    
    const tracking = json?.data?.tracking;
    if (!tracking) {
      return jsonResponse(
        { success: false, error: 'Invalid response from tracking provider' },
        500
      );
    }
    
    const checkpoints = Array.isArray(tracking.checkpoints) ? tracking.checkpoints : [];
    const lastCheckpoint = checkpoints[checkpoints.length - 1] || null;
    
    // Map to your response format
    const mapped = {
      trackingNumber: tracking.tracking_number || trackingId,
      courier: tracking.slug || courier,
      courierName: tracking.courier_name || null,
      status: tracking.tag || 'unknown',
      statusDetail: tracking.subtag || null,
      currentLocation: lastCheckpoint?.location || lastCheckpoint?.city || 'Unknown',
      estimatedDelivery: tracking.expected_delivery || null,
      actualDelivery: tracking.delivery_time || null,
      origin: tracking.origin_country_iso3 || null,
      destination: tracking.destination_country_iso3 || null,
      shipmentType: tracking.shipment_type || null,
      lastUpdated: tracking.updated_at || null,
      history: checkpoints.map((cp) => ({
        date: cp.checkpoint_time || cp.created_at || null,
        location: cp.location || cp.city || 'Unknown',
        status: cp.tag || 'update',
        statusDetail: cp.subtag || null,
        description: cp.message || cp.subtag_message || 'Status update',
      })),
    };
    
    return jsonResponse({ success: true, data: mapped }, 200);
    
  } catch (err) {
    console.error('Tracking error:', err);
    console.error('Error details:', {
      message: err?.message,
      stack: err?.stack,
      trackingId,
      courier
    });
    
    // Check for specific error types
    const errMsg = err?.message || String(err);
    
    if (errMsg.includes('not found') || errMsg.includes('404')) {
      return jsonResponse(
        { success: false, error: 'Tracking not found. Please verify the tracking ID and courier.' },
        404
      );
    }
    
    if (errMsg.includes('rate limit') || errMsg.includes('429')) {
      return jsonResponse(
        { success: false, error: 'Service rate limit exceeded. Please try again later.' },
        429
      );
    }
    
    if (errMsg.includes('unauthorized') || errMsg.includes('401')) {
      return jsonResponse(
        { success: false, error: 'Service configuration error' },
        500
      );
    }
    
    return jsonResponse(
      { 
        success: false, 
        error: 'Unable to fetch tracking information',
        details: process.env.NODE_ENV === 'development' ? errMsg : undefined
      },
      500
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/track') {
      return handleTrackRequest(request, env);
    }

    if (url.pathname === '/') {
      return jsonResponse({ 
        service: 'AfterShip Tracking API',
        version: '2.0',
        apiVersion: '2025-07',
        endpoints: {
          track: '/api/track?trackingId=XXX&courier=YYY (courier optional)',
          test: '/test'
        }
      });
    }

    if (url.pathname === '/test') {
      return jsonResponse({ 
        message: 'Worker is working!',
        timestamp: new Date().toISOString(),
        env: {
          hasApiKey: !!env.AFTERSHIP_API_KEY,
          apiKeyPreview: env.AFTERSHIP_API_KEY ? env.AFTERSHIP_API_KEY.substring(0, 10) + '...' : 'missing'
        }
      });
    }

    return jsonResponse({ success: false, error: 'Not found' }, 404);
  },
};