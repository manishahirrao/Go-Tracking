import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TrackProduct.css';

const TrackProduct = ({ onSubmit }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateTrackingNumber = (value) => {
    // Tracking number should be alphanumeric and 10-15 characters
    const regex = /^[A-Za-z0-9]{10,15}$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    if (!validateTrackingNumber(trackingNumber)) {
      setError('Invalid tracking number format');
      return;
    }

    // If onSubmit prop is provided, use it; otherwise navigate to tracking page
    if (onSubmit) {
      onSubmit(trackingNumber);
    } else {
      navigate(`/tracking?id=${trackingNumber}`);
    }
  };

  return (
    <section className="track-product-section">
      <div className="theme-container container">
        <div className="track-prod clrbg-before">
          <h2 className="title-1">track your product</h2>
          <span className="track-subtitle fs-12">
            Now you can track your product easily
          </span>
          <form onSubmit={handleSubmit} className="track-form">
            <div className="track-form-row">
              <div className="track-input-wrapper">
                <input
                  type="text"
                  placeholder="Enter your product ID"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className={`form-control box-shadow ${error ? 'error' : ''}`}
                  aria-label="Tracking number"
                  aria-invalid={!!error}
                />
                {error && <span className="error-message">{error}</span>}
              </div>
              <div className="track-button-wrapper">
                <button type="submit" className="btn-1">
                  track your product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

TrackProduct.propTypes = {
  onSubmit: PropTypes.func
};

export default TrackProduct;
