import { supabase } from '../lib/supabase';

/**
 * Contact Service
 * Handles all contact form operations with Supabase
 */

/**
 * Submit a contact form
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} Created contact with ID
 */
export const submitContactForm = async (contactData) => {
  try {
    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];

    for (const field of requiredFields) {
      if (!contactData[field] || contactData[field].trim().length === 0) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Prepare contact data
    const newContact = {
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone ? contactData.phone.trim() : null,
      subject: contactData.subject ? contactData.subject.trim() : null,
      message: contactData.message.trim(),
      status: 'new'
    };

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([newContact])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      contactId: data.id,
      contact: data
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error(error.message || 'Failed to submit contact form');
  }
};

/**
 * Get all contact submissions with optional filters (Admin function)
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} Array of contact submissions
 */
export const getAllContacts = async (filters = {}) => {
  try {
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.email) {
      query = query.ilike('email', `%${filters.email}%`);
    }

    if (filters.name) {
      query = query.ilike('name', `%${filters.name}%`);
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
    console.error('Error fetching contacts:', error);
    throw new Error(error.message || 'Failed to fetch contacts');
  }
};

/**
 * Get contact by ID (Admin function)
 * @param {string} contactId - The contact ID
 * @returns {Promise<Object|null>} Contact object or null
 */
export const getContactById = async (contactId) => {
  try {
    if (!contactId) {
      throw new Error('Contact ID is required');
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', contactId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw new Error(error.message || 'Failed to fetch contact');
  }
};

/**
 * Update contact status (Admin function)
 * @param {string} contactId - The contact ID
 * @param {string} status - New status (new, in_progress, resolved)
 * @returns {Promise<boolean>} Success status
 */
export const updateContactStatus = async (contactId, status) => {
  try {
    if (!contactId || !status) {
      throw new Error('Contact ID and status are required');
    }

    const validStatuses = ['new', 'in_progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', contactId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw new Error(error.message || 'Failed to update contact status');
  }
};

/**
 * Delete a contact (Admin function)
 * @param {string} contactId - The contact ID to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteContact = async (contactId) => {
  try {
    if (!contactId) {
      throw new Error('Contact ID is required');
    }

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', contactId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw new Error(error.message || 'Failed to delete contact');
  }
};

/**
 * Get contact statistics (Admin function)
 * @returns {Promise<Object>} Contact statistics
 */
export const getContactStatistics = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('status');

    if (error) {
      throw error;
    }

    const stats = {
      total: data.length,
      new: data.filter(c => c.status === 'new').length,
      in_progress: data.filter(c => c.status === 'in_progress').length,
      resolved: data.filter(c => c.status === 'resolved').length
    };

    return stats;
  } catch (error) {
    console.error('Error fetching contact statistics:', error);
    throw new Error(error.message || 'Failed to fetch contact statistics');
  }
};
