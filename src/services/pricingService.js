import { supabase } from '../lib/supabase';

/**
 * Pricing Service
 * Handles all pricing-related operations with Supabase
 */

/**
 * Get all active pricing rules
 * @returns {Promise<Array>} Array of pricing rules
 */
export const getPricingRules = async () => {
  try {
    const { data, error } = await supabase
      .from('pricing_rules')
      .select('*')
      .eq('active', true)
      .order('service_level', { ascending: true });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching pricing rules:', error);
    throw new Error(error.message || 'Failed to fetch pricing rules');
  }
};

/**
 * Get pricing rule by service level
 * @param {string} serviceLevel - The service level (standard, express, overnight)
 * @returns {Promise<Object|null>} Pricing rule or null
 */
export const getPricingRuleByServiceLevel = async (serviceLevel) => {
  try {
    if (!serviceLevel) {
      throw new Error('Service level is required');
    }

    const { data, error } = await supabase
      .from('pricing_rules')
      .select('*')
      .eq('service_level', serviceLevel.toLowerCase())
      .eq('active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching pricing rule:', error);
    throw new Error(error.message || 'Failed to fetch pricing rule');
  }
};

/**
 * Calculate distance between two locations (simplified)
 * In production, you would use a real geocoding API like Google Maps
 * @param {string} origin - Origin address
 * @param {string} destination - Destination address
 * @returns {number} Distance in kilometers (estimated)
 */
const calculateDistance = (origin, destination) => {
  // This is a simplified calculation
  // In production, use a geocoding API to get actual coordinates and calculate distance
  
  // For now, return a random distance between 100-5000 km based on string comparison
  // This ensures consistent results for the same origin/destination pair
  const hash = (origin + destination).split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  const distance = 100 + (hash % 4900); // Between 100 and 5000 km
  return distance;
};

/**
 * Validate shipment parameters
 * @param {Object} params - Shipment parameters
 * @throws {Error} If validation fails
 */
const validateShipmentParams = (params) => {
  const errors = [];

  if (!params.weight || params.weight <= 0) {
    errors.push('Weight must be greater than 0');
  }

  if (!params.origin || typeof params.origin !== 'string' || params.origin.trim().length === 0) {
    errors.push('Origin address is required');
  }

  if (!params.destination || typeof params.destination !== 'string' || params.destination.trim().length === 0) {
    errors.push('Destination address is required');
  }

  if (!params.service_level || typeof params.service_level !== 'string') {
    errors.push('Service level is required');
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
};

/**
 * Calculate shipping cost for a single service level
 * @param {Object} params - Shipment parameters
 * @param {Object} pricingRule - Pricing rule for the service level
 * @returns {Object} Pricing breakdown
 */
const calculateCostForServiceLevel = (params, pricingRule) => {
  const weight = parseFloat(params.weight);
  const distance = calculateDistance(params.origin, params.destination);

  // Calculate components
  const basePrice = parseFloat(pricingRule.base_price);
  const weightCharge = weight * parseFloat(pricingRule.price_per_kg);
  const distanceCharge = pricingRule.price_per_km 
    ? distance * parseFloat(pricingRule.price_per_km)
    : 0;

  // Calculate total
  let totalCost = basePrice + weightCharge + distanceCharge;

  // Apply minimum price if set
  if (pricingRule.min_price && totalCost < parseFloat(pricingRule.min_price)) {
    totalCost = parseFloat(pricingRule.min_price);
  }

  // Check max weight restriction
  if (pricingRule.max_weight && weight > parseFloat(pricingRule.max_weight)) {
    throw new Error(
      `Weight ${weight}kg exceeds maximum ${pricingRule.max_weight}kg for ${pricingRule.service_level} service`
    );
  }

  return {
    service_level: pricingRule.service_level,
    base_price: basePrice,
    weight_charge: weightCharge,
    distance_charge: distanceCharge,
    total_cost: Math.round(totalCost * 100) / 100, // Round to 2 decimal places
    distance_km: Math.round(distance),
    weight_kg: weight
  };
};

/**
 * Calculate shipping cost for all available service levels
 * @param {Object} params - Shipment parameters
 * @param {number} params.weight - Package weight in kg
 * @param {Object} params.dimensions - Package dimensions {length, width, height}
 * @param {string} params.origin - Origin address
 * @param {string} params.destination - Destination address
 * @param {string} params.service_level - Optional: specific service level to calculate
 * @returns {Promise<Array>} Array of pricing options
 */
export const calculateShippingCost = async (params) => {
  try {
    // Validate parameters
    validateShipmentParams(params);

    // If specific service level requested, calculate only for that
    if (params.service_level) {
      const pricingRule = await getPricingRuleByServiceLevel(params.service_level);
      
      if (!pricingRule) {
        throw new Error(`Pricing rule not found for service level: ${params.service_level}`);
      }

      const result = calculateCostForServiceLevel(params, pricingRule);
      return [result];
    }

    // Otherwise, calculate for all active service levels
    const pricingRules = await getPricingRules();

    if (pricingRules.length === 0) {
      throw new Error('No pricing rules available');
    }

    const results = [];
    const errors = [];

    for (const rule of pricingRules) {
      try {
        const result = calculateCostForServiceLevel(params, rule);
        results.push(result);
      } catch (err) {
        // Collect errors but continue with other service levels
        errors.push(`${rule.service_level}: ${err.message}`);
      }
    }

    if (results.length === 0) {
      throw new Error(`No valid pricing options available. ${errors.join('; ')}`);
    }

    return results;
  } catch (error) {
    console.error('Error calculating shipping cost:', error);
    throw new Error(error.message || 'Failed to calculate shipping cost');
  }
};

/**
 * Update pricing rule (Admin function)
 * @param {string} ruleId - Pricing rule ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated pricing rule
 */
export const updatePricingRule = async (ruleId, updates) => {
  try {
    if (!ruleId) {
      throw new Error('Pricing rule ID is required');
    }

    const allowedFields = [
      'base_price',
      'price_per_kg',
      'price_per_km',
      'min_price',
      'max_weight',
      'active'
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('pricing_rules')
      .update(updateData)
      .eq('id', ruleId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating pricing rule:', error);
    throw new Error(error.message || 'Failed to update pricing rule');
  }
};

/**
 * Create new pricing rule (Admin function)
 * @param {Object} ruleData - Pricing rule data
 * @returns {Promise<Object>} Created pricing rule
 */
export const createPricingRule = async (ruleData) => {
  try {
    const requiredFields = ['service_level', 'base_price', 'price_per_kg'];
    
    for (const field of requiredFields) {
      if (!ruleData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const { data, error } = await supabase
      .from('pricing_rules')
      .insert([ruleData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating pricing rule:', error);
    throw new Error(error.message || 'Failed to create pricing rule');
  }
};

/**
 * Get estimated delivery date based on service level
 * @param {string} serviceLevel - Service level
 * @returns {Date} Estimated delivery date
 */
export const getEstimatedDeliveryDate = (serviceLevel) => {
  const now = new Date();
  let daysToAdd = 3; // Default

  switch (serviceLevel.toLowerCase()) {
    case 'overnight':
      daysToAdd = 1;
      break;
    case 'express':
      daysToAdd = 2;
      break;
    case 'standard':
      daysToAdd = 5;
      break;
    default:
      daysToAdd = 3;
  }

  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
  
  return deliveryDate;
};
