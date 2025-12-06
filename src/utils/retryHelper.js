/**
 * Retry Helper Utilities
 * Provides retry logic for handling concurrent updates and transient failures
 */

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retries (default: 3)
 * @param {number} initialDelay - Initial delay in ms (default: 100)
 * @param {number} maxDelay - Maximum delay in ms (default: 5000)
 * @returns {Promise} - Result of the function
 */
export const retryWithBackoff = async (
  fn,
  maxRetries = 3,
  initialDelay = 100,
  maxDelay = 5000
) => {
  let lastError;
  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on certain errors
      if (isNonRetryableError(error)) {
        throw error;
      }

      // Last attempt, throw error
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying with exponential backoff
      await sleep(Math.min(delay, maxDelay));
      delay *= 2; // Exponential backoff

      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`);
    }
  }

  throw lastError;
};

/**
 * Check if error is non-retryable
 * @param {Error} error - The error to check
 * @returns {boolean} - True if non-retryable
 */
const isNonRetryableError = (error) => {
  // Don't retry on validation errors, not found, etc.
  const nonRetryableCodes = [
    'PGRST116', // Not found
    '23505', // Unique violation
    '23503', // Foreign key violation
    '23502', // Not null violation
    '23514', // Check violation
  ];

  if (error.code && nonRetryableCodes.includes(error.code)) {
    return true;
  }

  // Don't retry on 4xx errors (client errors)
  if (error.status && error.status >= 400 && error.status < 500) {
    return true;
  }

  return false;
};

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after delay
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry a Supabase operation with optimistic locking
 * @param {Function} fetchFn - Function to fetch current data
 * @param {Function} updateFn - Function to update data
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise} - Updated data
 */
export const retryWithOptimisticLocking = async (fetchFn, updateFn, maxRetries = 3) => {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Fetch current data
      const currentData = await fetchFn();

      if (!currentData) {
        throw new Error('Record not found');
      }

      // Attempt update with current version
      const result = await updateFn(currentData);

      return result;
    } catch (error) {
      // If it's a conflict error and we have retries left, try again
      if (error.code === '40001' && attempt < maxRetries) {
        // PostgreSQL serialization failure
        console.log(`Concurrent update detected, retrying... (${attempt + 1}/${maxRetries})`);
        await sleep(100 * Math.pow(2, attempt)); // Exponential backoff
        continue;
      }

      throw error;
    }
  }

  throw new Error('Max retries exceeded for concurrent update');
};

/**
 * Execute multiple operations in a transaction-like manner
 * @param {Array<Function>} operations - Array of async operations
 * @param {Function} rollbackFn - Optional rollback function
 * @returns {Promise<Array>} - Results of all operations
 */
export const executeWithRollback = async (operations, rollbackFn = null) => {
  const results = [];
  let completedOperations = 0;

  try {
    for (const operation of operations) {
      const result = await operation();
      results.push(result);
      completedOperations++;
    }

    return results;
  } catch (error) {
    console.error(`Operation failed after ${completedOperations} successful operations`);

    // Attempt rollback if provided
    if (rollbackFn) {
      try {
        await rollbackFn(results);
        console.log('Rollback completed successfully');
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
    }

    throw error;
  }
};

/**
 * Debounce function to prevent rapid successive calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * Throttle function to limit call frequency
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (fn, limit = 1000) => {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Queue operations to prevent concurrent execution
 */
export class OperationQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async add(operation) {
    return new Promise((resolve, reject) => {
      this.queue.push({ operation, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const { operation, resolve, reject } = this.queue.shift();

      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }

    this.processing = false;
  }
}

/**
 * Create a singleton operation queue for a specific resource
 * @param {string} resourceId - Unique identifier for the resource
 * @returns {OperationQueue} - Operation queue instance
 */
const queues = new Map();

export const getQueueForResource = (resourceId) => {
  if (!queues.has(resourceId)) {
    queues.set(resourceId, new OperationQueue());
  }
  return queues.get(resourceId);
};
