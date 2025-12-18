import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button';
import { validateTrackingNumber } from '../../../utils/validators';

const TrackingForm = ({ onSubmit, loading = false, submittedNumber = '', onReset, initialTrackingNumber = '' }) => {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber || '');
  const [error, setError] = useState('');

  // Update input when submittedNumber changes (for reset)
  useEffect(() => {
    if (submittedNumber === '' && trackingNumber && !loading) {
      setTrackingNumber('');
      setError('');
    }
  }, [submittedNumber, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate tracking number
    if (!validateTrackingNumber(trackingNumber)) {
      setError('Please enter a valid tracking number (5-30 characters, letters/numbers/dashes only)');
      return; // Don't call onSubmit for validation errors
    }

    // Call parent submit handler only for valid tracking numbers
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
            placeholder="Enter your Australia Post tracking number (e.g., 1234567890, AB123456789, 9B0001234567890)"
            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 text-base transition-colors text-black ${
              error 
                ? 'border-red focus:ring-red' 
                : 'border-border focus:ring-primary'
            }`}
            disabled={loading}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'tracking-error' : undefined}
          />
          {error && (
            <div 
              id="tracking-error" 
              className="mt-3 p-4 rounded-sm" 
              role="alert"
              style={{ 
                backgroundColor: '#b71521', 
                borderLeft: '4px solid #9a4018', 
                boxShadow: '0 1px 3px 0 rgba(183, 21, 33, 0.3)'
              }}
            >
              <div className="flex items-start">
                <svg className="h-5 w-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#ffffff' }}>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="ml-3 flex-1">
                  <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                    Invalid Tracking Number
                  </p>
                  <p style={{ color: '#fca5a5', fontSize: '13px', marginBottom: '8px' }}>
                    {error}
                  </p>
                  <div style={{ borderTop: '1px solid #991b1b', paddingTop: '8px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#fca5a5', marginBottom: '4px' }}>
                      Valid format examples:
                    </p>
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px', fontSize: '11px', color: '#fca5a5', margin: '0' }}>
                      <li style={{ marginBottom: '2px' }}>ABC1234567890 (letters + numbers)</li>
                      <li style={{ marginBottom: '2px' }}>1Z9999W99999999999 (UPS style)</li>
                      <li style={{ marginBottom: '2px' }}>TRACK-123-ABCDEF (with dashes)</li>
                      <li style={{ marginBottom: '0' }}>1234567890 (numbers only)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
  submittedNumber: PropTypes.string,
  onReset: PropTypes.func,
  initialTrackingNumber: PropTypes.string,
};

export default TrackingForm;
