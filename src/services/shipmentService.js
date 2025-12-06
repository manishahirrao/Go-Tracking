import { supabase } from '../lib/supabase';

/**
 * Shipment Service
 * Handles all shipment-related operations with Supabase
 */

/**
 * Get shipment by tracking number
 * @param {string} trackingNumber - The tracking number to search for
 * @returns {Promise<Object|null>} Shipment object or null if not found
 */
export const getShipmentByTrackingNumber = async (trackingNumber) => {
  try {
    if (!trackingNumber || typeof trackingNumber !== 'string') {
      throw new Error('Invalid tracking number');
    }

    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trackingNumber.trim().toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching shipment:', error);
    throw new Error(error.message || 'Failed to fetch shipment');
  }
};

/**
 * Get shipment status history
 * @param {string} shipmentId - The shipment ID
 * @returns {Promise<Array>} Array of status history entries
 */
export const getShipmentHistory = async (shipmentId) => {
  try {
    if (!shipmentId) {
      throw new Error('Shipment ID is required');
    }

    const { data, error } = await supabase
      .from('shipment_status_history')
      .select('*')
      .eq('shipment_id', shipmentId)
      .order('timestamp', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching shipment history:', error);
    throw new Error(error.message || 'Failed to fetch shipment history');
  }
};

/**
 * Generate a unique tracking number
 * Format: TRK-YYYY-NNNNNN
 * @returns {string} Generated tracking number
 */
const generateTrackingNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `TRK-${year}-${random}`;
};

/**
 * Create a new shipment (Admin function)
 * @param {Object} shipmentData - Shipment data
 * @returns {Promise<Object>} Created shipment with tracking number
 */
export const createShipment = async (shipmentData) => {
  try {
    // Validate required fields
    const requiredFields = [
      'sender_name',
      'sender_address',
      'recipient_name',
      'recipient_address',
      'weight',
      'service_level'
    ];

    for (const field of requiredFields) {
      if (!shipmentData[field]) {
        return { data: null, error: `Missing required field: ${field}` };
      }
    }

    // Generate tracking number
    let trackingNumber;
    let attempts = 0;
    const maxAttempts = 10;

    // Try to generate a unique tracking number
    while (attempts < maxAttempts) {
      trackingNumber = generateTrackingNumber();
      
      // Check if tracking number already exists
      const existing = await getShipmentByTrackingNumber(trackingNumber);
      if (!existing) {
        break;
      }
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return { data: null, error: 'Failed to generate unique tracking number' };
    }

    // Prepare shipment data
    const newShipment = {
      tracking_number: trackingNumber,
      sender_name: shipmentData.sender_name,
      sender_address: shipmentData.sender_address,
      sender_phone: shipmentData.sender_phone || null,
      sender_email: shipmentData.sender_email || null,
      recipient_name: shipmentData.recipient_name,
      recipient_address: shipmentData.recipient_address,
      recipient_phone: shipmentData.recipient_phone || null,
      recipient_email: shipmentData.recipient_email || null,
      weight: parseFloat(shipmentData.weight),
      dimensions: shipmentData.dimensions || null,
      service_level: shipmentData.service_level,
      current_status: 'pending',
      current_location: shipmentData.current_location || 'Warehouse',
      estimated_delivery: shipmentData.estimated_delivery || null,
      cost: shipmentData.cost ? parseFloat(shipmentData.cost) : null,
      notes: shipmentData.notes || null
    };

    const { data, error } = await supabase
      .from('shipments')
      .insert([newShipment])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error creating shipment:', error);
    return { data: null, error: error.message || 'Failed to create shipment' };
  }
};

/**
 * Update shipment status (Admin function)
 * @param {string} shipmentId - The shipment ID
 * @param {string} status - New status
 * @param {string} location - Current location (optional)
 * @param {string} notes - Additional notes (optional)
 * @returns {Promise<Object>} Updated shipment
 */
export const updateShipmentStatus = async (shipmentId, statusData) => {
  try {
    if (!shipmentId) {
      return { data: null, error: 'Shipment ID is required' };
    }

    const { status, location, notes } = statusData;

    if (!status) {
      return { data: null, error: 'Status is required' };
    }

    const validStatuses = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return { data: null, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` };
    }

    const updateData = {
      current_status: status,
      updated_at: new Date().toISOString()
    };

    if (location) {
      updateData.current_location = location;
    }

    if (notes) {
      updateData.notes = notes;
    }

    // If status is delivered, set actual_delivery timestamp
    if (status === 'delivered') {
      updateData.actual_delivery = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('shipments')
      .update(updateData)
      .eq('id', shipmentId)
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error updating shipment status:', error);
    return { data: null, error: error.message || 'Failed to update shipment status' };
  }
};

/**
 * Get all shipments with optional filters (Admin function)
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of shipments
 */
export const getAllShipments = async (filters = {}) => {
  try {
    let query = supabase
      .from('shipments')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('current_status', filters.status);
    }

    if (filters.service_level) {
      query = query.eq('service_level', filters.service_level);
    }

    if (filters.tracking_number) {
      query = query.ilike('tracking_number', `%${filters.tracking_number}%`);
    }

    if (filters.from_date) {
      query = query.gte('created_at', filters.from_date);
    }

    if (filters.to_date) {
      query = query.lte('created_at', filters.to_date);
    }

    // Pagination
    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error fetching shipments:', error);
    throw new Error(error.message || 'Failed to fetch shipments');
  }
};

/**
 * Delete a shipment (Admin function)
 * @param {string} shipmentId - The shipment ID to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteShipment = async (shipmentId) => {
  try {
    if (!shipmentId) {
      throw new Error('Shipment ID is required');
    }

    const { error } = await supabase
      .from('shipments')
      .delete()
      .eq('id', shipmentId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting shipment:', error);
    throw new Error(error.message || 'Failed to delete shipment');
  }
};


/**
 * Real-time Subscription Functions
 */

/**
 * Subscribe to shipment updates
 * @param {string} trackingNumber - The tracking number to subscribe to
 * @param {Function} callback - Callback function to handle updates
 * @returns {Object} Supabase channel object
 */
export const subscribeToShipment = (trackingNumber, callback) => {
  try {
    if (!trackingNumber || typeof callback !== 'function') {
      throw new Error('Tracking number and callback function are required');
    }

    const channel = supabase
      .channel(`shipment-${trackingNumber}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shipments',
          filter: `tracking_number=eq.${trackingNumber}`
        },
        (payload) => {
          console.log('Shipment update received:', payload);
          callback(payload.new || payload.old);
        }
      )
      .subscribe((status, error) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to shipment updates for ${trackingNumber}`);
        }
        if (status === 'CHANNEL_ERROR') {
          console.error('Subscription error:', error);
          // Attempt to reconnect after 5 seconds
          setTimeout(() => {
            console.log('Attempting to reconnect...');
            channel.subscribe();
          }, 5000);
        }
        if (status === 'TIMED_OUT') {
          console.warn('Subscription timed out, reconnecting...');
          channel.subscribe();
        }
      });

    return channel;
  } catch (error) {
    console.error('Error subscribing to shipment:', error);
    throw new Error(error.message || 'Failed to subscribe to shipment updates');
  }
};

/**
 * Subscribe to shipment status history updates
 * @param {string} shipmentId - The shipment ID to subscribe to
 * @param {Function} callback - Callback function to handle updates
 * @returns {Object} Supabase channel object
 */
export const subscribeToShipmentHistory = (shipmentId, callback) => {
  try {
    if (!shipmentId || typeof callback !== 'function') {
      throw new Error('Shipment ID and callback function are required');
    }

    const channel = supabase
      .channel(`shipment-history-${shipmentId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'shipment_status_history',
          filter: `shipment_id=eq.${shipmentId}`
        },
        (payload) => {
          console.log('Status history update received:', payload);
          callback(payload.new);
        }
      )
      .subscribe((status, error) => {
        if (status === 'SUBSCRIBED') {
          console.log(`Subscribed to status history for shipment ${shipmentId}`);
        }
        if (status === 'CHANNEL_ERROR') {
          console.error('Subscription error:', error);
        }
      });

    return channel;
  } catch (error) {
    console.error('Error subscribing to shipment history:', error);
    throw new Error(error.message || 'Failed to subscribe to shipment history');
  }
};

/**
 * Unsubscribe from shipment updates
 * @param {Object} channel - The Supabase channel to unsubscribe from
 * @returns {Promise<void>}
 */
export const unsubscribeFromShipment = async (channel) => {
  try {
    if (!channel) {
      return;
    }

    await supabase.removeChannel(channel);
    console.log('Unsubscribed from shipment updates');
  } catch (error) {
    console.error('Error unsubscribing:', error);
  }
};

/**
 * Get connection status
 * @returns {string} Connection status
 */
export const getConnectionStatus = () => {
  // Supabase doesn't expose connection status directly
  // This is a placeholder for future implementation
  return 'connected';
};
