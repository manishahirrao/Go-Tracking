import { useState } from 'react';
import TrackingForm from '../components/tracking/TrackingForm';
import TrackingResult from '../components/tracking/TrackingResult';
import { getTrackingInfo } from '../services/trackingService';

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
    <div className="min-h-screen bg-bg-light py-20">
      <div className="container mx-auto max-w-container px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-secondary font-black uppercase mb-4">
            Track Your <span className="text-primary">Package</span>
          </h1>
          <p className="text-light-gray max-w-2xl mx-auto">
            Enter your tracking number to see real-time updates on your package location and delivery status.
          </p>
        </div>

        {!trackingData && !error && (
          <TrackingForm onSubmit={handleTrackingSubmit} loading={loading} />
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red/10 border-2 border-red text-red p-6 rounded-sm mb-6 animate-fade-in-up">
              <h3 className="font-secondary font-bold uppercase mb-2">
                Tracking Error
              </h3>
              <p>{error}</p>
            </div>
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-primary hover:text-primary-dark font-secondary font-semibold uppercase underline"
              >
                Try Another Tracking Number
              </button>
            </div>
          </div>
        )}

        {trackingData && (
          <div>
            <TrackingResult data={trackingData} />
            <div className="text-center mt-8">
              <button
                onClick={handleReset}
                className="text-primary hover:text-primary-dark font-secondary font-semibold uppercase underline"
              >
                Track Another Package
              </button>
            </div>
          </div>
        )}

        {/* Demo Tracking Numbers */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-primary">
            <h3 className="font-secondary font-bold uppercase mb-3 text-black">
              Demo Tracking Numbers
            </h3>
            <p className="text-sm text-light-gray mb-3">
              Try these tracking numbers to see different package statuses:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                <span className="font-mono text-primary">ABC1234567890</span>
                <span className="text-gray">In Transit</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-mono text-primary">XYZ9876543210</span>
                <span className="text-gray">Delivered</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-mono text-primary">TEST1234567890</span>
                <span className="text-gray">Pending</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
