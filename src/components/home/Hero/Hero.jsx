


// ============================================
// Hero.jsx - FIXED VERSION
// ============================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateTrackingNumber = (value) => {
    // Allow alphanumeric and dashes, minimum 10 characters
    const regex = /^[A-Za-z0-9\-]{10,}$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleaned = trackingNumber.trim();

    if (!cleaned) {
      setError('Please enter a tracking number');
      return;
    }

    if (!validateTrackingNumber(cleaned)) {
      setError('Invalid tracking number format (min 10 characters, letters/numbers/dashes only)');
      return;
    }

    navigate(`/tracking?id=${cleaned}`);
  };

  return (
    <section className="hero-banner">
      <div className="container mx-auto max-w-container px-4 relative">
       
        <h1 className="hero-title">
          Fast & Simple <br />
          <span className="text-primary">Australia Post</span> Tracking Helper
        </h1>
        <p className="hero-subtitle">
          Track your Australia Post shipments instantly with real-time updates — an independent helper, not an official AusPost website.
        </p>

        <div className="hero-track-box">
          <h2 className="track-box-title">Track Your Product</h2>
          <p className="track-box-subtitle">Enter your tracking number to see real-time updates</p>
          <form onSubmit={handleSubmit} className="hero-track-form">
            <div className="track-form-group">
              <input
                type="text"
                placeholder="Enter your Australia Post tracking number (e.g., 1234567890, AB123456789, 9B0001234567890)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className={`track-input ${error ? 'error' : ''}`}
                aria-label="Tracking number"
              />
              <button type="submit" className="track-button">
                Track Now
              </button>
            </div>
            {error && <span className="track-error-message">{error}</span>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;