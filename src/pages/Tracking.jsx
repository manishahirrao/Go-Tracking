import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader/PageHeader';
import TrackingForm from '../components/tracking/TrackingForm/TrackingForm';
import TrackingResult from '../components/tracking/TrackingResult/TrackingResult';
import './Tracking.css';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState('');
  const [showResult, setShowResult] = useState(false);
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

  // Auto-submit if tracking number is in URL
  useEffect(() => {
    const trackingId = searchParams.get('id');
    if (trackingId && !submittedTrackingNumber) {
      // Small delay to ensure everything is mounted
      setTimeout(() => {
        handleTrackingSubmit(trackingId);
      }, 100);
    }
  }, [searchParams]);

    const handleReset = () => {
    setSubmittedTrackingNumber('');
    setShowResult(false);
    setTrackingData(null);
    setError(null);
    // Navigate to clean URL
    navigate('/tracking');
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
            {/* Tracking Form */}
            <div className="mb-12">
              <TrackingForm onSubmit={handleTrackingSubmit} loading={loading} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mb-8 bg-red/10 border-l-4 border-red p-6 rounded-sm">
                <p className="text-sm text-red font-medium">{error}</p>
              </div>
            )}

            {/* Tracking Result */}
            {trackingData && showResult && (
              <div>
                <TrackingResult data={trackingData} isRealtime={isConnected} />
                <div className="text-center mt-8">
                  <button onClick={handleReset}>Track Another Package</button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-sm text-gray-600">Tracking your package...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tracking;
