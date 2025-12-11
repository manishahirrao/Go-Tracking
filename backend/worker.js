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

// Rate limiting
const RATE_LIMIT = 10; // requests per minute
const rateLimitMap = new Map();

function checkRateLimit(clientIP) {
  const now = Date.now();
  const requests = rateLimitMap.get(clientIP) || [];
  const recentRequests = requests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(clientIP, recentRequests);
  return true;
}

async function handleTrackRequest(request, env) {
  // Handle CORS preflight FIRST
  if (request.method === 'OPTIONS') {
    return jsonResponse({}, 204);
  }

  if (request.method !== 'GET') {
    return jsonResponse({ success: false, error: 'Method not allowed' }, 405);
  }

  const requestUrl = new URL(request.url);
  const trackingId = (requestUrl.searchParams.get('trackingId') || '').trim();
  const courierRaw = (requestUrl.searchParams.get('courier') || '').trim();

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
      { success: false, error: 'Too many requests. Please try again later.' },
      429
    );
  }

  if (!env.AFTERSHIP_API_KEY) {
    return jsonResponse(
      { success: false, error: 'Service temporarily unavailable. Please try again later.' },
      500
    );
  }

  // Build AfterShip URL
  const courierSlug = courierRaw || undefined;
  const path = courierSlug
    ? `/trackings/${encodeURIComponent(courierSlug)}/${encodeURIComponent(
        trackingId
      )}`
    : `/trackings/${encodeURIComponent(trackingId)}`;
  const targetUrl = `${AFTERSHIP_BASE_URL}${path}`;

  try {
    const res = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'aftership-api-key': env.AFTERSHIP_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        json?.meta?.message ||
        json?.message ||
        'Unable to fetch tracking details';
      const code = json?.meta?.code || res.status;

      if (code === 404) {
        return jsonResponse(
          { success: false, error: 'Tracking not found. Please check the ID.' },
          404
        );
      }

      return jsonResponse(
        {
          success: false,
          error: msg,
        },
        res.status
      );
    }

    const tracking = json?.data?.tracking;
    if (!tracking) {
      return jsonResponse(
        { success: false, error: 'Invalid response from tracking provider' },
        500
      );
    }

    const checkpoints = Array.isArray(tracking.checkpoints)
      ? tracking.checkpoints
      : [];

    const lastCheckpoint = checkpoints[checkpoints.length - 1] || null;

    const mapped = {
      trackingNumber: tracking.tracking_number || trackingId,
      courier: tracking.slug || courierSlug || null,
      status: tracking.tag || tracking.subtag || 'unknown',
      currentLocation: lastCheckpoint?.location || lastCheckpoint?.city || 'Unknown',
      estimatedDelivery: tracking.expected_delivery_date || tracking.etd || tracking.eta || new Date().toISOString(),
      origin: tracking.origin_country_iso3 || 'Origin not available',
      destination: tracking.destination_country_iso3 || 'Destination not available',
      history: checkpoints.map((cp) => ({
        date: cp.checkpoint_time || cp.created_at || null,
        location: cp.location || cp.city || 'Unknown',
        status: cp.tag || cp.subtag || 'update',
        description: cp.message || cp.subtag_message || 'Status update',
      })),
    };

    return jsonResponse({ success: true, data: mapped }, 200);
  } catch (err) {
    return jsonResponse(
      {
        success: false,
        error: 'Unexpected error while calling tracking service',
        details: (err && err.message) || String(err),
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

    return jsonResponse({ success: false, error: 'Not found' }, 404);
  },
};