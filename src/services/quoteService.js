import { supabase } from '../lib/supabase';

/**
 * Quote Service
 * Handles all quote request operations with Supabase
 */

/**
 * Submit a new quote request
 * @param {Object} quoteData - Quote request data
 * @returns {Promise<Object>} Created quote with ID
 */
export const submitQuoteRequest = async (quoteData) => {
  try {
    // Validate required fields
    const requiredFields = [
      'customer_name',
      'customer_email',
      'origin_address',
      'destination_address'
    ];

    for (const field of requiredFields) {
      if (!quoteData[field]) {
        throw new Error(`Missing required field: ${field.replace('_', ' ')}`);
      }
    }

    // Prepare quote data
    const newQuote = {
      customer_name: quoteData.customer_name,
      customer_email: quoteData.customer_email,
      customer_phone: quoteData.customer_phone || null,
      origin_address: quoteData.origin_address,
      destination_address: quoteData.destination_address,
      weight: quoteData.weight ? parseFloat(quoteData.weight) : null,
      dimensions: quoteData.dimensions || null,
      service_level: quoteData.service_level || null,
      description: quoteData.description || null,
      status: 'pending'
    };

    const { data, error } = await supabase
      .from('quote_requests')
      .insert([newQuote])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      quoteId: data.id,
      quote: data
    };
  } catch (error) {
    console.error('Error submitting quote request:', error);
    throw new Error(error.message || 'Failed to submit quote request');
  }
};

/**
 * Get quote by ID
 * @param {string} quoteId - The quote ID
 * @returns {Promise<Object|null>} Quote object or null
 */
export const getQuoteById = async (quoteId) => {
  try {
    if (!quoteId) {
      throw new Error('Quote ID is required');
    }

    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('id', quoteId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw new Error(error.message || 'Failed to fetch quote');
  }
};

/**
 * Get quotes by customer email
 * @param {string} email - Customer email address
 * @returns {Promise<Array>} Array of quotes
 */
export const getQuotesByEmail = async (email) => {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('customer_email', email.toLowerCase())
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching quotes by email:', error);
    throw new Error(error.message || 'Failed to fetch quotes');
  }
};

/**
 * Update quote status (Admin function)
 * @param {string} quoteId - The quote ID
 * @param {string} status - New status (pending, quoted, accepted, rejected)
 * @param {number} quotedPrice - Optional quoted price
 * @returns {Promise<boolean>} Success status
 */
export const updateQuoteStatus = async (quoteId, status, quotedPrice = null) => {
  try {
    if (!quoteId || !status) {
      throw new Error('Quote ID and status are required');
    }

    const validStatuses = ['pending', 'quoted', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const updateData = {
      status
    };

    if (quotedPrice !== null) {
      updateData.quoted_price = parseFloat(quotedPrice);
      updateData.quoted_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('quote_requests')
      .update(updateData)
      .eq('id', quoteId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating quote status:', error);
    throw new Error(error.message || 'Failed to update quote status');
  }
};

/**
 * Get all quotes with optional filters (Admin function)
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of quotes
 */
export const getAllQuotes = async (filters = {}) => {
  try {
    let query = supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.customer_email) {
      query = query.ilike('customer_email', `%${filters.customer_email}%`);
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

    return data || [];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw new Error(error.message || 'Failed to fetch quotes');
  }
};

/**
 * Delete a quote (Admin function)
 * @param {string} quoteId - The quote ID to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteQuote = async (quoteId) => {
  try {
    if (!quoteId) {
      throw new Error('Quote ID is required');
    }

    const { error } = await supabase
      .from('quote_requests')
      .delete()
      .eq('id', quoteId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw new Error(error.message || 'Failed to delete quote');
  }
};
