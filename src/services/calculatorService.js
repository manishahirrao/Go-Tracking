/**
 * Calculator Service
 * Handles shipping cost calculations based on package dimensions, weight, and delivery options
 */

/**
 * Delivery speed options with multipliers and estimated days
 */
export const DELIVERY_OPTIONS = {
  economy: {
    type: 'economy',
    name: 'Economy Delivery',
    multiplier: 0.8,
    estimatedDays: 7,
  },
  standard: {
    type: 'standard',
    name: 'Standard Delivery',
    multiplier: 1.0,
    estimatedDays: 3,
  },
  express: {
    type: 'express',
    name: 'Express Delivery',
    multiplier: 1.5,
    estimatedDays: 1,
  },
};

/**
 * Calculate dimensional weight (used for pricing)
 * Formula: (height * width * depth) / 5000
 * @param {number} height - Height in cm
 * @param {number} width - Width in cm
 * @param {number} depth - Depth in cm
 * @returns {number} - Dimensional weight in kg
 */
const calculateDimensionalWeight = (height, width, depth) => {
  return (height * width * depth) / 5000;
};

/**
 * Calculate distance factor based on locations
 * This is a simplified calculation - in production would use actual distance API
 * @param {string} from - Origin location
 * @param {string} to - Destination location
 * @returns {number} - Distance multiplier (1.0 to 2.0)
 */
const calculateDistanceFactor = (from, to) => {
  // Simplified: if locations are different, apply distance factor
  const fromLower = from.toLowerCase().trim();
  const toLower = to.toLowerCase().trim();

  if (fromLower === toLower) {
    return 1.0; // Same location
  }

  // Check if both are in same state/region (simplified check)
  const fromState = fromLower.split(',')[0] || fromLower;
  const toState = toLower.split(',')[0] || toLower;

  if (fromState === toState) {
    return 1.2; // Same region
  }

  return 1.5; // Different regions
};

/**
 * Calculate base cost from package dimensions and weight
 * Uses the greater of actual weight or dimensional weight
 * @param {Object} dimensions - Package dimensions
 * @param {number} dimensions.height - Height in cm
 * @param {number} dimensions.width - Width in cm
 * @param {number} dimensions.depth - Depth in cm
 * @param {number} dimensions.weight - Weight in kg
 * @returns {number} - Base cost before multipliers
 */
const calculateBaseCost = ({ height, width, depth, weight }) => {
  const dimensionalWeight = calculateDimensionalWeight(height, width, depth);
  const chargeableWeight = Math.max(weight, dimensionalWeight);

  // Base rate: $5 per kg
  const baseRate = 5;
  return chargeableWeight * baseRate;
};

/**
 * Calculate discount based on package size/weight
 * Larger packages get volume discounts
 * @param {number} baseCost - Base cost before discount
 * @returns {number} - Discount amount
 */
const calculateDiscount = (baseCost) => {
  if (baseCost > 100) {
    return baseCost * 0.1; // 10% discount for large packages
  }
  if (baseCost > 50) {
    return baseCost * 0.05; // 5% discount for medium packages
  }
  return 0; // No discount for small packages
};

/**
 * Calculate shipping cost
 * @param {Object} params - Calculation parameters
 * @param {number} params.height - Height in cm
 * @param {number} params.width - Width in cm
 * @param {number} params.depth - Depth in cm
 * @param {number} params.weight - Weight in kg
 * @param {string} params.from - Origin location
 * @param {string} params.to - Destination location
 * @param {string} params.deliverySpeed - Delivery speed option ('economy', 'standard', 'express')
 * @returns {Object} - Cost breakdown
 */
export const calculateShippingCost = ({
  height,
  width,
  depth,
  weight,
  from,
  to,
  deliverySpeed = 'standard',
}) => {
  // Calculate base cost
  const baseCost = calculateBaseCost({ height, width, depth, weight });

  // Calculate distance factor
  const distanceFactor = calculateDistanceFactor(from, to);

  // Apply distance to base cost
  const costWithDistance = baseCost * distanceFactor;

  // Get delivery option
  const deliveryOption = DELIVERY_OPTIONS[deliverySpeed] || DELIVERY_OPTIONS.standard;

  // Calculate speed surcharge
  const speedSurcharge = costWithDistance * (deliveryOption.multiplier - 1);

  // Calculate discount
  const discount = calculateDiscount(costWithDistance);

  // Calculate total
  const total = costWithDistance + speedSurcharge - discount;

  return {
    baseCost: parseFloat(baseCost.toFixed(2)),
    speedSurcharge: parseFloat(speedSurcharge.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    breakdown: {
      dimensionalWeight: parseFloat(
        calculateDimensionalWeight(height, width, depth).toFixed(2)
      ),
      distanceFactor: parseFloat(distanceFactor.toFixed(2)),
      speedFactor: parseFloat(deliveryOption.multiplier.toFixed(2)),
    },
    estimatedDays: deliveryOption.estimatedDays,
  };
};
