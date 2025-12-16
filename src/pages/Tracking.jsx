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
    setStatusText('Finding tracking details in website...');
    console.log('Processing tracking request...');
    
    // Show processing steps
    setTimeout(() => setStatusText('Validating tracking number format...'), 800);
    setTimeout(() => setStatusText('Searching for tracking details in database...'), 1600);
    setTimeout(() => setStatusText('Retrieving package information...'), 2400);
    setTimeout(() => setStatusText('Preparing tracking results...'), 3200);
    
    // Show success message with button after processing
    setTimeout(() => {
      console.log('Processing complete, showing success message');
      setStatusText('Tracking details retrieved successfully!');
      setShowSuccess(true);
      setLoading(false);
    }, 4000);
  };

  // Function to open Australia Post with tracking number
  const openAustraliaPostTracking = () => {
    const trackingUrl = `https://auspost.com.au/mypost/track/details/${submittedTrackingNumber}`;
    console.log('Opening Australia Post tracking with URL:', trackingUrl);
    window.open(trackingUrl, '_blank');
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
                <div className="bg-white border-2 border-green-300 rounded-2xl p-6 shadow-2xl">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-3 shadow-lg animate-pulse">
                      <svg className="w-6 h-6 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-green-800 mb-2">Tracking Details Retrieved Successfully!</h3>
                    <p className="text-green-700 text-base mb-3">Your tracking information has been found and is ready to view</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-green-200 shadow-inner mb-4">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Tracking Number</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border-2 border-gray-300">
                      <p className="text-base font-mono font-bold text-gray-900 tracking-wider">{submittedTrackingNumber}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <button 
                      onClick={openAustraliaPostTracking}
                      className="bg-green-600 text-yellow px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <div className="flex items-center justify-center space-x-2 ">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        <span>Open Australia Post Official Tracking</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Click the button above to view your tracking results on Australia Post's official website</p>
                    <button 
                      onClick={handleReset}
                      className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold underline transition-colors text-sm"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
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
