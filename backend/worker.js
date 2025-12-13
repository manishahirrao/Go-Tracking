const AFTERSHIP_BASE_URL = 'https://api.aftership.com/tracking/2025-07';

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
const RATE_LIMIT = 10;
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
  
  if (Math.random() < 0.01) {
    cleanupRateLimit();
  }
  
  return true;
}

async function getTracking(trackingNumber, courier, apiKey) {
  console.log('Getting tracking:', { trackingNumber, courier });
  
  // Use GET /trackings with query parameters to search for the tracking
  const params = new URLSearchParams({
    tracking_numbers: trackingNumber,
    ...(courier && { slug: courier }),
  });
  
  const searchUrl = `${AFTERSHIP_BASE_URL}/trackings?${params.toString()}`;
  console.log('Searching with URL:', searchUrl);
  
  const searchRes = await fetch(searchUrl, {
    method: 'GET',
    headers: {
      'as-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Search response status:', searchRes.status);
  
  const searchJson = await searchRes.json().catch(() => ({}));
  console.log('Search response:', JSON.stringify(searchJson).substring(0, 500));
  
  if (!searchRes.ok) {
    const errorMsg = searchJson?.meta?.message || 'Failed to search tracking';
    console.error('Search failed:', errorMsg);
    throw new Error(errorMsg);
  }
  
  // Check if we found the tracking
  const trackings = searchJson?.data?.trackings || [];
  
  if (trackings.length === 0) {
    console.log('No tracking found, will try to create it');
    return null; // Will create it
  }
  
  // Found it! Return the first match
  console.log('Found tracking:', trackings[0].id);
  return { data: { tracking: trackings[0] } };
}

async function createTracking(trackingNumber, courier, apiKey) {
  console.log('Creating tracking:', { trackingNumber, courier });
  
  const createUrl = `${AFTERSHIP_BASE_URL}/trackings`;
  const createBody = {
    tracking_number: trackingNumber,
  };
  
  if (courier) {
    createBody.slug = courier;
  }
  
  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'as-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createBody)
  });
  
  console.log('Create response status:', createRes.status);
  
  const createJson = await createRes.json().catch(() => ({}));
  console.log('Create response:', JSON.stringify(createJson).substring(0, 500));
  
  if (!createRes.ok) {
    const errorMsg = createJson?.meta?.message || 'Failed to create tracking';
    throw new Error(errorMsg);
  }
  
  return createJson;
}

async function handleTrackRequest(request, env) {
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
    return jsonResponse(
      { success: false, error: 'Service temporarily unavailable' },
      500
    );
  }
  
  try {
    console.log('Fetching tracking for:', trackingId);
    
    // Try to get existing tracking first
    let json = await getTracking(trackingId, courier, env.AFTERSHIP_API_KEY);
    
    // If not found, create it
    if (!json) {
      console.log('Tracking not found, creating new one');
      json = await createTracking(trackingId, courier, env.AFTERSHIP_API_KEY);
    }
    
    console.log('Received tracking data');
    
    const tracking = json?.data?.tracking;
    if (!tracking) {
      console.error('No tracking object in response');
      return jsonResponse(
        { success: false, error: 'Invalid response from tracking provider' },
        500
      );
    }
    
    const checkpoints = Array.isArray(tracking.checkpoints) ? tracking.checkpoints : [];
    const lastCheckpoint = checkpoints[checkpoints.length - 1] || null;
    
    const mapped = {
      trackingNumber: tracking.tracking_number,
      courier: tracking.slug,
      courierName: tracking.courier_name || null,
      status: tracking.tag || 'unknown',
      statusDetail: tracking.subtag || null,
      currentLocation: lastCheckpoint?.location || lastCheckpoint?.city || 'Unknown',
      estimatedDelivery: tracking.expected_delivery || null,
      actualDelivery: tracking.delivery_time || tracking.shipment_delivery_date || null,
      origin: tracking.origin_country_region || null,
      destination: tracking.destination_country_region || null,
      shipmentType: tracking.shipment_type || null,
      signedBy: tracking.signed_by || null,
      lastUpdated: tracking.updated_at || null,
      isActive: tracking.active !== false,
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
      trackingId,
      courier
    });
    
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
        debugInfo: {
          errorMessage: errMsg,
          trackingId: trackingId,
          courier: courier,
          timestamp: new Date().toISOString()
        }
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
    
    // Endpoint to list all trackings
    if (url.pathname === '/api/list') {
      try {
        const listRes = await fetch(`${AFTERSHIP_BASE_URL}/trackings?page=1&limit=50`, {
          method: 'GET',
          headers: {
            'as-api-key': env.AFTERSHIP_API_KEY,
            'Content-Type': 'application/json',
          },
        });
        
        const data = await listRes.json();
        const trackings = data?.data?.trackings || [];
        const simplified = trackings.map(t => ({
          id: t.id,
          tracking_number: t.tracking_number,
          slug: t.slug,
          courier_name: t.courier_name,
          tag: t.tag,
          active: t.active,
          origin: t.origin_country_region,
          destination: t.destination_country_region
        }));
        
        return jsonResponse({
          success: listRes.ok,
          total: data?.data?.pagination?.total || 0,
          trackings: simplified
        });
      } catch (error) {
        return jsonResponse({
          success: false,
          error: error.message
        }, 500);
      }
    }
    
    if (url.pathname === '/') {
      return jsonResponse({ 
        service: 'AfterShip Tracking API',
        version: '3.0',
        apiVersion: '2025-07',
        endpoints: {
          track: '/api/track?trackingId=XXX&courier=YYY (courier optional)',
          list: '/api/list (view all trackings in your account)'
        }
      });
    }
    
    return jsonResponse({ success: false, error: 'Not found' }, 404);
  },
};