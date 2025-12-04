/**
 * Validates tracking number format
 * Accepts alphanumeric tracking numbers between 10-15 characters
 * @param {string} trackingNumber - The tracking number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateTrackingNumber = (trackingNumber) => {
  if (!trackingNumber || typeof trackingNumber !== 'string') {
    return false;
  }

  // Remove whitespace
  const cleaned = trackingNumber.trim();

  // Check length (10-15 characters)
  if (cleaned.length < 10 || cleaned.length > 15) {
    return false;
  }

  // Check if alphanumeric only
  const alphanumericRegex = /^[A-Za-z0-9]+$/;
  return alphanumericRegex.test(cleaned);
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
