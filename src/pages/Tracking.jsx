import { useState } from 'react';
import PageHeader from '../components/common/PageHeader/PageHeader';
import TrackingForm from '../components/tracking/TrackingForm/TrackingForm';
import TrackingResult from '../components/tracking/TrackingResult/TrackingResult';
import { getTrackingInfo } from '../services/trackingService';
import './Tracking.css';

const Tracking = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackingSubmit = async (trackingNumber) => {
    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const data = await getTrackingInfo(trackingNumber);
      setTrackingData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tracking information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTrackingData(null);
    setError('');
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
                    <p className="text-sm text-red font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tracking Result */}
            {trackingData && (
              <div>
                <TrackingResult data={trackingData} />
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

            {/* Demo Info */}
            {!trackingData && !loading && (
              <div className="max-w-2xl mx-auto mt-12 border-l-4 border-blue p-6 rounded-sm shadow-lg" style={{ backgroundColor: '#eff6ff' }}>
                <h3 className="font-secondary font-bold uppercase mb-4" style={{ color: '#1e40af', letterSpacing: '1px', fontSize: '0.875rem' }}>
                  Try Demo Tracking Numbers:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="font-mono bg-white px-4 py-2 rounded shadow-sm mr-4 font-bold" style={{ color: '#1a1a1a', fontSize: '0.875rem' }}>
                      ABC1234567890
                    </span>
                    <span className="font-medium" style={{ color: '#4a5568' }}>Package in transit</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-mono bg-white px-4 py-2 rounded shadow-sm mr-4 font-bold" style={{ color: '#1a1a1a', fontSize: '0.875rem' }}>
                      XYZ9876543210
                    </span>
                    <span className="font-medium" style={{ color: '#4a5568' }}>Delivered package</span>
                  </li>
                  <li className="flex items-center">
                    <span className="font-mono bg-white px-4 py-2 rounded shadow-sm mr-4 font-bold" style={{ color: '#1a1a1a', fontSize: '0.875rem' }}>
                      TEST1234567890
                    </span>
                    <span className="font-medium" style={{ color: '#4a5568' }}>Pending pickup</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tracking;
