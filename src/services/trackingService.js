/**
 * Mock tracking service
 * In production, this would make API calls to a real tracking backend
 */

// Mock tracking data
const mockTrackingData = {
  'ABC1234567890': {
    trackingNumber: 'ABC1234567890',
    status: 'in-transit',
    currentLocation: 'Distribution Center, New York, NY',
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    origin: 'Los Angeles, CA',
    destination: 'Boston, MA',
    history: [
      {
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'Order Placed',
        location: 'Los Angeles, CA',
        description: 'Package information received'
      },
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Picked Up',
        location: 'Los Angeles, CA',
        description: 'Package picked up by courier'
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'In Transit',
        location: 'Phoenix, AZ',
        description: 'Package in transit to next facility'
      },
      {
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        status: 'In Transit',
        location: 'Dallas, TX',
        description: 'Package arrived at sorting facility'
      },
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'In Transit',
        location: 'Distribution Center, New York, NY',
        description: 'Package out for delivery'
      }
    ]
  },
  'XYZ9876543210': {
    trackingNumber: 'XYZ9876543210',
    status: 'delivered',
    currentLocation: 'Seattle, WA',
    estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    origin: 'San Francisco, CA',
    destination: 'Seattle, WA',
    history: [
      {
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'Order Placed',
        location: 'San Francisco, CA',
        description: 'Package information received'
      },
      {
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: 'Picked Up',
        location: 'San Francisco, CA',
        description: 'Package picked up by courier'
      },
      {
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'In Transit',
        location: 'Portland, OR',
        description: 'Package in transit'
      },
      {
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Out for Delivery',
        location: 'Seattle, WA',
        description: 'Package out for delivery'
      },
      {
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'Delivered',
        location: 'Seattle, WA',
        description: 'Package delivered successfully'
      }
    ]
  },
  'TEST1234567890': {
    trackingNumber: 'TEST1234567890',
    status: 'pending',
    currentLocation: 'Warehouse, Miami, FL',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    origin: 'Miami, FL',
    destination: 'Chicago, IL',
    history: [
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: 'Order Placed',
        location: 'Miami, FL',
        description: 'Package information received'
      }
    ]
  }
};

/**
 * Fetches tracking information for a given tracking number
 * @param {string} trackingNumber - The tracking number to look up
 * @returns {Promise<Object>} - Tracking data or error
 */
export const getTrackingInfo = async (trackingNumber) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const data = mockTrackingData[trackingNumber];

  if (!data) {
    throw new Error('Tracking number not found. Please check your tracking number and try again.');
  }

  return data;
};

/**
 * Generates a random tracking number for demo purposes
 * @returns {string} - A valid tracking number
 */
export const generateTrackingNumber = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
