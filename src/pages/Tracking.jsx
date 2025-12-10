import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader/PageHeader';
import TrackingForm from '../components/tracking/TrackingForm/TrackingForm';
import TrackingResult from '../components/tracking/TrackingResult/TrackingResult';
import './Tracking.css';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Auto-submit if tracking number is in URL
  useEffect(() => {
    const trackingId = searchParams.get('id');
    if (trackingId && !submittedTrackingNumber) {
      setSubmittedTrackingNumber(trackingId);
      setShowResult(true);
    }
  }, [searchParams, submittedTrackingNumber]);

  // Mock tracking data for demo purposes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shipment, setShipment] = useState(null);
  const [history, setHistory] = useState([]);
  const [isConnected] = useState(true);

  const handleTrackingSubmit = (trackingNumber) => {
    setSubmittedTrackingNumber(trackingNumber);
    setShowResult(true);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (trackingNumber === 'DEMO-123456') {
        setShipment({
          id: trackingNumber,
          status: 'in_transit',
          estimated_delivery: '2025-12-15',
          current_location: 'Distribution Center, New York',
          recipient: 'John Doe',
          sender: 'Jane Smith',
          weight: '2.5 kg',
          service_type: 'express'
        });
        setHistory([
          { date: '2025-12-10 14:30', location: 'New York, NY', status: 'Package picked up', description: 'Package picked up from sender' },
          { date: '2025-12-10 16:45', location: 'Distribution Center, New York', status: 'In transit', description: 'Package arrived at distribution center' },
          { date: '2025-12-11 09:20', location: 'Distribution Center, New York', status: 'In transit', description: 'Package processed for delivery' }
        ]);
        setError(null);
      } else {
        setError('Tracking number not found. Please check and try again.');
        setShipment(null);
        setHistory([]);
      }
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setSubmittedTrackingNumber('');
    setShowResult(false);
  };

  // Transform shipment data to match TrackingResult component format
  const trackingData = shipment ? {
    trackingNumber: shipment.tracking_number,
    status: shipment.current_status,
    currentLocation: shipment.current_location || 'Unknown',
    estimatedDelivery: shipment.estimated_delivery || new Date(),
    origin: shipment.sender_address,
    destination: shipment.recipient_address,
    history: history.map(h => ({
      date: h.timestamp,
      location: h.location || 'Unknown',
      status: h.status,
      description: h.notes || `Package ${h.status.replace('_', ' ')}`
    }))
  } : null;

  return (
    <div>
      <PageHeader 
        title="Track Your Package" 
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Tracking', path: '/tracking' }
        ]}
      />
      
      <section className="tracking-hero-section py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Intro Text */}
            <div className="text-center mb-10">
              <h2 
                className="font-secondary font-black uppercase mb-3" 
                style={{ color: '#1a1a1a', letterSpacing: '0.8px', fontSize: '1.75rem' }}
              >
                Real-Time Package Tracking
              </h2>
              <p className="font-medium max-w-2xl mx-auto" style={{ color: '#4a5568', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Enter your tracking number below to get real-time updates on your package location and delivery status
              </p>
            </div>

            {/* Tracking Form */}
            <div className="mb-12">
              <TrackingForm onSubmit={handleTrackingSubmit} loading={loading} />
            </div>

            {/* Connection Status Indicator */}
            {showResult && submittedTrackingNumber && !isConnected && (
              <div className="max-w-2xl mx-auto mb-8 bg-yellow/10 border-l-4 border-yellow p-6 rounded-sm animate-fade-in-up">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow font-medium">Real-time updates temporarily unavailable. Reconnecting...</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && showResult && (
              <div className="max-w-2xl mx-auto mb-8 bg-red/10 border-l-4 border-red p-6 rounded-sm animate-fade-in-up">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tracking Result */}
            {trackingData && showResult && (
              <div>
                <TrackingResult data={trackingData} isRealtime={isConnected} />
                <div className="text-center mt-8">
                  <button
                    onClick={handleReset}
                    className="font-secondary font-bold uppercase underline transition-all hover:scale-105"
                    style={{ 
                      color: 'var(--color-primary)', 
                      letterSpacing: '1px',
                      fontSize: '0.875rem'
                    }}
                  >
                    Track Another Package
                  </button>
                </div>
              </div>
            )}

            {/* Info Box */}
            {!showResult && !loading && (
              <div className="max-w-2xl mx-auto mt-12 border-l-4 border-blue p-6 rounded-sm shadow-lg" style={{ backgroundColor: '#eff6ff' }}>
                <h3 className="font-secondary font-bold uppercase mb-4" style={{ color: '#1e40af', letterSpacing: '1px', fontSize: '0.875rem' }}>
                  How to Track Your Package:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-bold mr-3" style={{ color: '#1e40af' }}>1.</span>
                    <span className="font-medium" style={{ color: '#4a5568' }}>Enter your tracking number in the format TRK-YYYY-NNNNNN</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-3" style={{ color: '#1e40af' }}>2.</span>
                    <span className="font-medium" style={{ color: '#4a5568' }}>View real-time updates on your package location and status</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-3" style={{ color: '#1e40af' }}>3.</span>
                    <span className="font-medium" style={{ color: '#4a5568' }}>Get automatic updates without refreshing the page</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t border-blue/30">
                  <p className="text-sm font-medium" style={{ color: '#4a5568' }}>
                    <strong>Note:</strong> Tracking numbers are provided when you create a shipment. If you don't have a tracking number yet, please contact our support team.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tracking;
