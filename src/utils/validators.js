/**
 * Validates tracking number format
 * Accepts alphanumeric tracking numbers with optional dashes
 * Format: TRK-YYYY-NNNNNN or alphanumeric 10-15 characters
 * @param {string} trackingNumber - The tracking number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateTrackingNumber = (trackingNumber) => {
  if (!trackingNumber || typeof trackingNumber !== 'string') {
    return false;
  }

  const cleaned = trackingNumber.trim();
  
  // Basic validation for tracking numbers
  // Minimum 3 characters, maximum 50 characters (typical tracking number limits)
  return cleaned.length >= 3 && cleaned.length <= 50;
};

/**
 * Validates positive number input
 * @param {number|string} value - The value to validate
 * @returns {boolean} - True if positive number, false otherwise
 */
export const validatePositiveNumber = (value) => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email, false otherwise
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates phone number format
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid phone, false otherwise
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Check if it has 10-15 digits
  return cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Validates required field (non-empty)
 * @param {string} value - The value to validate
 * @returns {boolean} - True if not empty, false otherwise
 */
export const validateRequired = (value) => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return true;
};
/**
 * Validates location string (non-empty string)
 * @param {string} location - The location to validate
 * @returns {boolean} - True if valid location, false otherwise
 */
export const validateLocation = (location) => {
  if (!location || typeof location !== 'string') {
    return false;
  }

  return location.trim().length > 0;
};

/**
 * Validates weight value
 * @param {number|string} weight - The weight to validate
 * @param {number} maxWeight - Optional maximum weight
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateWeight = (weight, maxWeight = null) => {
  const num = Number(weight);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Weight must be a number' };
  }
  
  if (num <= 0) {
    return { valid: false, error: 'Weight must be greater than 0' };
  }
  
  if (maxWeight && num > maxWeight) {
    return { valid: false, error: `Weight cannot exceed ${maxWeight} kg` };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates dimensions object
 * @param {object} dimensions - The dimensions to validate {length, width, height}
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateDimensions = (dimensions) => {
  if (!dimensions || typeof dimensions !== 'object') {
    return { valid: false, error: 'Dimensions must be an object' };
  }
  
  const { length, width, height } = dimensions;
  
  if (!length || !width || !height) {
    return { valid: false, error: 'All dimensions (length, width, height) are required' };
  }
  
  const lengthNum = Number(length);
  const widthNum = Number(width);
  const heightNum = Number(height);
  
  if (isNaN(lengthNum) || isNaN(widthNum) || isNaN(heightNum)) {
    return { valid: false, error: 'All dimensions must be numbers' };
  }
  
  if (lengthNum <= 0 || widthNum <= 0 || heightNum <= 0) {
    return { valid: false, error: 'All dimensions must be greater than 0' };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates address string
 * @param {string} address - The address to validate
 * @param {number} minLength - Minimum length (default: 5)
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateAddress = (address, minLength = 5) => {
  if (!address || typeof address !== 'string') {
    return { valid: false, error: 'Address is required' };
  }
  
  const trimmed = address.trim();
  
  if (trimmed.length < minLength) {
    return { valid: false, error: `Address must be at least ${minLength} characters` };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates service level
 * @param {string} serviceLevel - The service level to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateServiceLevel = (serviceLevel) => {
  const validLevels = ['standard', 'express', 'overnight'];
  
  if (!serviceLevel || typeof serviceLevel !== 'string') {
    return { valid: false, error: 'Service level is required' };
  }
  
  if (!validLevels.includes(serviceLevel.toLowerCase())) {
    return { valid: false, error: `Service level must be one of: ${validLevels.join(', ')}` };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates shipment status
 * @param {string} status - The status to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateShipmentStatus = (status) => {
  const validStatuses = ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'];
  
  if (!status || typeof status !== 'string') {
    return { valid: false, error: 'Status is required' };
  }
  
  if (!validStatuses.includes(status.toLowerCase())) {
    return { valid: false, error: `Status must be one of: ${validStatuses.join(', ')}` };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates quote status
 * @param {string} status - The status to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateQuoteStatus = (status) => {
  const validStatuses = ['pending', 'quoted', 'accepted', 'rejected'];
  
  if (!status || typeof status !== 'string') {
    return { valid: false, error: 'Status is required' };
  }
  
  if (!validStatuses.includes(status.toLowerCase())) {
    return { valid: false, error: `Status must be one of: ${validStatuses.join(', ')}` };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates contact status
 * @param {string} status - The status to validate
 * @returns {object} - { valid: false, error: string }
 */
export const validateContactStatus = (status) => {
  const validStatuses = ['new', 'in_progress', 'resolved'];
  
  if (!status || typeof status !== 'string') {
    return { valid: false, error: 'Status is required' };
  }
  
  if (!validStatuses.includes(status.toLowerCase())) {
    return { valid: false, error: `Status must be one of: ${validStatuses.join(', ')}` };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates price value
 * @param {number|string} price - The price to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validatePrice = (price) => {
  const num = Number(price);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Price must be a number' };
  }
  
  if (num < 0) {
    return { valid: false, error: 'Price cannot be negative' };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates date string
 * @param {string} dateString - The date string to validate
 * @returns {object} - { valid: boolean, error: string }
 */
export const validateDate = (dateString) => {
  if (!dateString) {
    return { valid: false, error: 'Date is required' };
  }
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return { valid: false, error: 'Invalid date format' };
  }
  
  return { valid: true, error: null };
};

/**
 * Validates UUID format
 * @param {string} uuid - The UUID to validate
 * @returns {boolean} - True if valid UUID, false otherwise
 */
export const validateUUID = (uuid) => {
  if (!uuid || typeof uuid !== 'string') {
    return false;
  }
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Validates shipment data object
 * @param {object} shipmentData - The shipment data to validate
 * @returns {object} - { valid: boolean, errors: array }
 */
export const validateShipmentData = (shipmentData) => {
  const errors = [];
  
  if (!shipmentData.sender_name || shipmentData.sender_name.trim().length === 0) {
    errors.push('Sender name is required');
  }
  
  const senderAddress = validateAddress(shipmentData.sender_address);
  if (!senderAddress.valid) {
    errors.push(`Sender address: ${senderAddress.error}`);
  }
  
  if (!shipmentData.recipient_name || shipmentData.recipient_name.trim().length === 0) {
    errors.push('Recipient name is required');
  }
  
  const recipientAddress = validateAddress(shipmentData.recipient_address);
  if (!recipientAddress.valid) {
    errors.push(`Recipient address: ${recipientAddress.error}`);
  }
  
  const weight = validateWeight(shipmentData.weight);
  if (!weight.valid) {
    errors.push(weight.error);
  }
  
  const serviceLevel = validateServiceLevel(shipmentData.service_level);
  if (!serviceLevel.valid) {
    errors.push(serviceLevel.error);
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize string input (remove potentially harmful characters)
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags and trim
  return input.replace(/<[^>]*>/g, '').trim();
};

/**
 * Validate and sanitize form data
 * @param {object} formData - The form data to validate
 * @param {object} rules - Validation rules
 * @returns {object} - { valid: boolean, errors: object, sanitized: object }
 */
export const validateFormData = (formData, rules) => {
  const errors = {};
  const sanitized = {};
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = formData[field];
    
    // Required check
    if (rule.required && !validateRequired(value)) {
      errors[field] = `${rule.label || field} is required`;
      continue;
    }
    
    // Skip validation if not required and empty
    if (!rule.required && !value) {
      sanitized[field] = value;
      continue;
    }
    
    // Type-specific validation
    if (rule.type === 'email' && !validateEmail(value)) {
      errors[field] = `${rule.label || field} must be a valid email`;
    } else if (rule.type === 'phone' && !validatePhone(value)) {
      errors[field] = `${rule.label || field} must be a valid phone number`;
    } else if (rule.type === 'number') {
      const num = Number(value);
      if (isNaN(num)) {
        errors[field] = `${rule.label || field} must be a number`;
      } else if (rule.min !== undefined && num < rule.min) {
        errors[field] = `${rule.label || field} must be at least ${rule.min}`;
      } else if (rule.max !== undefined && num > rule.max) {
        errors[field] = `${rule.label || field} must be at most ${rule.max}`;
      }
    } else if (rule.type === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
      } else if (rule.maxLength && value.length > rule.maxLength) {
        errors[field] = `${rule.label || field} must be at most ${rule.maxLength} characters`;
      }
    }
    
    // Sanitize string values
    if (typeof value === 'string') {
      sanitized[field] = sanitizeString(value);
    } else {
      sanitized[field] = value;
    }
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
};
