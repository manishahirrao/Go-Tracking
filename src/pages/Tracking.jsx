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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [isConnected] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_TRACKING_API_BASE_URL || '';

  const handleTrackingSubmit = async (trackingNumber) => {
    setSubmittedTrackingNumber(trackingNumber);
    setShowResult(true);
    setLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const query = new URLSearchParams({
        trackingId: trackingNumber.trim(),
        courier: '', // optional: let AfterShip auto-detect
      });

      const response = await fetch(`${apiBaseUrl}/api/track?${query.toString()}`);

      const json = await response.json().catch(() => ({}));

      if (!json.success) {
        const errorMsg = json.error || 'Unable to track this shipment.';
        if (json.error?.includes('Tracking not found')) {
          setError('Tracking number not found. Please double-check the number and try again.');
        } else if (json.error?.includes('missing API key')) {
          setError('Service temporarily unavailable. Please try again later.');
        } else if (json.error?.includes('Too many requests')) {
          setError('Too many requests. Please wait a moment and try again.');
        } else {
          setError(errorMsg);
        }
        setTrackingData(null);
        return;
      }

      const data = json.data;
      if (!data) {
        setError('No tracking data available for this shipment.');
        setTrackingData(null);
        return;
      }

      const mappedTracking = {
        trackingNumber: data.trackingNumber,
        status: (data.status || 'pending').toLowerCase().replace(' ', '-'),
        currentLocation: data.currentLocation || 'Unknown',
        estimatedDelivery: data.estimatedDelivery || new Date(),
        origin: data.origin || 'Origin not available',
        destination: data.destination || 'Destination not available',
        history: Array.isArray(data.history)
          ? data.history.map((h) => ({
              date: h.date,
              location: h.location || 'Unknown',
              status: h.status || 'update',
              description: h.description || 'Status update',
            }))
          : [],
      };

      setTrackingData(mappedTracking);
    } catch (err) {
      setError('Network error while contacting tracking service.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedTrackingNumber('');
    setShowResult(false);
    setTrackingData(null);
    setError(null);
  };

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
            {error && (
              <div className="max-w-2xl mx-auto mb-8 bg-red/10 border-l-4 border-red p-6 rounded-sm animate-fade-in-up">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red font-medium mb-2">{error}</p>
                    {error.includes('not found') && (
                      <p className="text-xs text-red/80">
                        Please check: <br />
                        • Tracking number is entered correctly <br />
                        • No extra spaces or characters <br />
                        • Package was shipped recently
                      </p>
                    )}
                    {error.includes('temporarily unavailable') && (
                      <p className="text-xs text-red/80">
                        Our tracking service is temporarily down. Please try again in a few minutes.
                      </p>
                    )}
                    {error.includes('Too many requests') && (
                      <p className="text-xs text-red/80">
                        Please wait a moment before making another tracking request.
                      </p>
                    )}
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
                    <span className="font-medium" style={{ color: '#4a5568' }}>Enter your tracking number (letters, numbers, dashes allowed)</span>
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
