// AfterShip API removed - using mock data instead

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
  
  // Return mock tracking data
  const mockData = {
    trackingNumber: trackingId,
    courier: courier || 'mock-courier',
    courierName: 'Mock Courier Service',
    status: 'in_transit',
    statusDetail: 'Package is in transit',
    currentLocation: 'Distribution Center',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    actualDelivery: null,
    origin: 'Origin City',
    destination: 'Destination City',
    shipmentType: 'package',
    signedBy: null,
    lastUpdated: new Date().toISOString(),
    isActive: true,
    history: [
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Origin Facility',
        status: 'info_received',
        statusDetail: 'Package information received',
        description: 'Package has been received at origin facility'
      },
      {
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Sorting Center',
        status: 'in_transit',
        statusDetail: 'Package in transit',
        description: 'Package is in transit to destination'
      },
      {
        date: new Date().toISOString(),
        location: 'Distribution Center',
        status: 'in_transit',
        statusDetail: 'Package at distribution center',
        description: 'Package has arrived at distribution center'
      }
    ]
  };
  
  return jsonResponse({ success: true, data: mockData }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/track') {
      return handleTrackRequest(request, env);
    }
    
    // Endpoint to list all trackings - removed
    if (url.pathname === '/api/list') {
      return jsonResponse({
        success: false,
        error: 'Tracking list endpoint has been disabled'
      }, 503);
    }
    
    if (url.pathname === '/') {
      return jsonResponse({ 
        service: 'Mock Tracking API',
        version: '3.0',
        endpoints: {
          track: '/api/track?trackingId=XXX&courier=YYY (courier optional)'
        }
      });
    }
    
    return jsonResponse({ success: false, error: 'Not found' }, 404);
  },
};