import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader/PageHeader';
import TrackingForm from '../components/tracking/TrackingForm/TrackingForm';
import './Tracking.css';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTrackingSubmit = async (trackingNumber) => {
    console.log('Starting tracking submission for:', trackingNumber);
    setSubmittedTrackingNumber(trackingNumber);
    setLoading(true);
    setError(null);
    setStatusText('Opening tracking page...');
    console.log('Opening Australia Post tracking immediately (direct user action - not blocked!)');
    
    // Open immediately in new tab (direct user action - never blocked!)
    window.open('https://auspost.com.au/mypost/track/search', '_blank');
    
    // Show success message after opening
    setTimeout(() => {
      setStatusText('Tracking page opened successfully!');
      setShowSuccess(true);
      setLoading(false);
    }, 1000);
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
    setLoading(false);
    setError(null);
    setStatusText('');
    setShowSuccess(false);
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

            {/* Loading State with Automatic Processing */}
            {loading && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-3 animate-pulse">
                      <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Processing Your Tracking Request</h3>
                    <p className="text-sm text-gray-600 mb-3">{statusText || 'Initializing tracking system...'}</p>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mb-4">
                    <div className="flex justify-center space-x-1.5 mb-3">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < (statusText.includes('Opening') ? 6 : 
                                 statusText.includes('Almost') ? 5 :
                                 statusText.includes('Preparing') ? 4 :
                                 statusText.includes('Retrieving') ? 3 :
                                 statusText.includes('Connecting') ? 2 :
                                 statusText.includes('Validating') ? 1 : 0) 
                              ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${(statusText.includes('Opening') ? 100 : 
                                    statusText.includes('Almost') ? 83 :
                                    statusText.includes('Preparing') ? 67 :
                                    statusText.includes('Retrieving') ? 50 :
                                    statusText.includes('Connecting') ? 33 :
                                    statusText.includes('Validating') ? 17 : 0)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Tracking Number Display */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Tracking Number:</p>
                    <p className="text-base font-mono font-semibold text-gray-900">{submittedTrackingNumber}</p>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500">
                    <p>Processing your request... You'll be redirected automatically</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white border border-green-200 rounded-xl p-6 shadow-lg">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mb-3">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Tracking Page Opened Successfully!</h3>
                    <p className="text-green-700 mb-4">Australia Post tracking page has been opened in a new tab</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-sm text-green-600 mb-1">Tracking Number:</p>
                    <p className="text-base font-mono font-semibold text-green-800">{submittedTrackingNumber}</p>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      onClick={() => window.open('https://auspost.com.au/mypost/track/search', '_blank')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium mr-2"
                    >
                      Open Tracking Page Again
                    </button>
                    <button 
                      onClick={handleReset}
                      className="text-green-600 hover:text-green-800 underline font-medium"
                    >
                      Track Another Package
                    </button>
                  </div>
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
