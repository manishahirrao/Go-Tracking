import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import { validateTrackingNumber } from '../../../utils/validators';

const TrackingForm = ({ onSubmit, loading = false }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate tracking number
    if (!validateTrackingNumber(trackingNumber)) {
      setError('Please enter a valid tracking number (10-15 alphanumeric characters)');
      return;
    }

    // Call parent submit handler
    onSubmit(trackingNumber.trim());
  };

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-primary">
        <div className="mb-6">
          <label 
            htmlFor="tracking-number" 
            className="block text-sm font-secondary font-semibold uppercase mb-2 text-black"
          >
            Tracking Number
          </label>
          <input
            id="tracking-number"
            type="text"
            value={trackingNumber}
            onChange={handleChange}
            placeholder="Enter your tracking number (e.g., ABC1234567890)"
            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 text-base transition-colors ${
              error 
                ? 'border-red focus:ring-red' 
                : 'border-border focus:ring-primary'
            }`}
            disabled={loading}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'tracking-error' : undefined}
          />
          {error && (
            <p id="tracking-error" className="mt-2 text-sm text-red" role="alert">
              {error}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          disabled={loading || !trackingNumber.trim()}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <span className="spinner mr-2"></span>
              Tracking...
            </span>
          ) : (
            'Track Package'
          )}
        </Button>

        <p className="mt-4 text-xs text-gray text-center">
          Tracking numbers are 10-15 characters long and contain only letters and numbers
        </p>
      </div>
    </form>
  );
};

TrackingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default TrackingForm;
