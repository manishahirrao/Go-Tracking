


// ============================================
// Hero.jsx - FIXED VERSION
// ============================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <img 
          src="/icons/icon-1.png" 
          alt="Delivery Icon" 
          className="hero-icon"
        />
        <ul className="hero-tags">
          <li><a href="#about">fast</a></li>
          <li><a href="#about">secured</a></li>
          <li><a href="#about">worldwide</a></li>
        </ul>
        <h1 className="hero-title">
          Fast & Reliable <br />
          <span className="text-primary">Courier</span> & <span className="text-primary">Delivery</span> Services
        </h1>
        <p className="hero-subtitle">
          Delivering excellence across the globe with speed, security, and reliability you can trust
        </p>

        <div className="hero-track-box">
          <h2 className="track-box-title">Track Your Product</h2>
          <p className="track-box-subtitle">Enter your tracking number to see real-time updates</p>
          <form onSubmit={handleSubmit} className="hero-track-form">
            <div className="track-form-group">
              <input
                type="text"
                placeholder="Enter your product ID (e.g., TRK-2025-123456)"
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