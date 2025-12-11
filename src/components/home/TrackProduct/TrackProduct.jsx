// ============================================
// TrackProduct.jsx - FIXED VERSION
// ============================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './TrackProduct.css';

const TrackingFormSimple = ({ onSubmit }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cleaned = trackingNumber.trim();
    
    // Allow letters, numbers, and dashes, minimum 10 characters
    if (cleaned.length >= 10) {
      onSubmit(cleaned);
    } else {
      alert('Please enter a valid tracking number (minimum 10 characters)');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="track-form-row" noValidate>
      <div className="track-input-wrapper">
        <input
          type="text"
          id="home-tracking-number"
          name="trackingNumber"
          placeholder="Enter your tracking number (e.g., TRK-2025-123456)"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="form-control box-shadow"
          aria-label="Tracking number"
          autoComplete="off"
        />
      </div>
      <div className="track-button-wrapper">
        <button type="submit" className="btn-1">
          track your product
        </button>
      </div>
    </form>
  );
};

TrackingFormSimple.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

const TrackProduct = ({ onSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = (trackingNumber) => {
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
          <div className="track-form">
            <TrackingFormSimple onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};

TrackProduct.propTypes = {
  onSubmit: PropTypes.func
};

export default TrackProduct;