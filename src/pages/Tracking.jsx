import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader/PageHeader';
import TrackingForm from '../components/tracking/TrackingForm/TrackingForm';
import TrackingFAQ from '../components/tracking/TrackingFAQ/TrackingFAQ';
import { updateMetaTags } from '../utils/seo';
import './Tracking.css';

const Tracking = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [submittedTrackingNumber, setSubmittedTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const successRef = useRef(null);

  // Update SEO meta tags for Tracking page
  useEffect(() => {
    const trackingMetaData = {
      title: 'Track Your Package - Australia Post Tracking Helper',
      description: 'Track your Australia Post packages quickly and easily. Get instant access to official tracking pages with our simple tracking tool.',
      keywords: 'Australia Post tracking, package tracking, shipment tracking, delivery tracking, track package',
      author: 'Australia Post Tracking Helper',
      url: 'https://australiaposttracking.online/tracking',
      image: '/logo-black.png',
      ogType: 'website',
      twitterCard: 'summary_large_image'
    };
    updateMetaTags(trackingMetaData);
  }, []);

  // Get tracking ID from URL for form prepopulation
  const urlTrackingId = searchParams.get('id');

  const handleTrackingSubmit = async (trackingNumber) => {
    console.log('Starting tracking submission for:', trackingNumber);
    // Clear previous success state immediately
    setShowSuccess(false);
    setSubmittedTrackingNumber(trackingNumber);
    setLoading(true);
    setError(null);
    setStatusText('Preparing your link to the official Australia Post tracking page...');
    console.log('Processing tracking request...');
    
    // Scroll to loading box immediately
    setTimeout(() => {
      const loadingElement = document.querySelector('.tracking-result-card--loading');
      if (loadingElement) {
        loadingElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    // Show processing steps
    setTimeout(() => setStatusText('Validating tracking number format...'), 3000);
    setTimeout(() => setStatusText('Connecting to Australia Post tracking...'), 6000);
    setTimeout(() => setStatusText('Opening official tracking details...'), 9000);
    setTimeout(() => setStatusText('Finalising your tracking link...'), 12000);
    setTimeout(() => setStatusText('Almost done... Preparing your results...'), 15000);
    setTimeout(() => setStatusText('Final verification...'), 18000);
    
    // Show success message with button after processing
    setTimeout(() => {
      console.log('Processing complete, showing success message');
      setStatusText('Tracking details retrieved successfully!');
      setShowSuccess(true);
      setLoading(false);
    }, 21000);
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

  // Clear form when reset is called
  useEffect(() => {
    if (!loading && !showSuccess && !submittedTrackingNumber) {
      // Clear the tracking form input
      const trackingInput = document.getElementById('tracking-number');
      if (trackingInput) {
        trackingInput.value = '';
      }
    }
  }, [loading, showSuccess, submittedTrackingNumber]);

  // Scroll to tracking page top if coming from FAQ
  useEffect(() => {
    if (location.state?.scrollToForm) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  const handleReset = () => {
    // Clear form input immediately
    const trackingInput = document.getElementById('tracking-number');
    if (trackingInput) {
      trackingInput.value = '';
    }
    
    setSubmittedTrackingNumber('');
    setLoading(false);
    setError(null);
    setStatusText('');
    setShowSuccess(false);
    navigate('/tracking');
  };

  // Scroll success box into view when it appears
  useEffect(() => {
    if (showSuccess && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showSuccess]);

  return (
    <div>
      <PageHeader 
        title="Track Your Package" 
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Tracking', path: '/tracking' }
        ]}
      />
      
      <section className="tracking-hero-section py-20 tracking-form-section">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tracking Form */}
            <div className="mb-12">
              <TrackingForm 
                onSubmit={handleTrackingSubmit} 
                loading={loading} 
                submittedNumber={submittedTrackingNumber}
                onReset={handleReset}
                initialTrackingNumber={urlTrackingId}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto mb-8 bg-red/10 border-l-4 border-red p-6 rounded-sm">
                <p className="text-sm text-red font-medium">{error}</p>
              </div>
            )}

            {/* Loading State with Automatic Processing */}
            {loading && (
              <div className="tracking-result-wrap max-w-2xl mx-auto text-center">
                <div className="tracking-result-card tracking-result-card--loading bg-white rounded-xl shadow-xl border border-gray-200 p-6">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-3 animate-pulse">
                      <svg className="w-6 h-6 tracking-icon text-white animate-spin" fill="none" viewBox="0 0 24 24">
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
              <div
                ref={successRef}
                className="tracking-result-wrap max-w-2xl mx-auto text-center"
              >
                <div className="tracking-result-card tracking-result-card--success bg-white border-2 rounded-2xl p-6 shadow-2xl">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-full mb-3 shadow-lg animate-pulse">
                      <svg className="w-6 h-6 success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">Tracking Details Retrieved Successfully!</h3>
                    <p className="text-base mb-3 text-white/90">Your tracking information has been found and is ready to view</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border shadow-inner mb-4">
                    <div className="text-center mb-4">
                      <p className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-2">Tracking Number</p>
                    </div>
                    <div className="tracking-number-container">
                      <p className="text-base font-mono font-bold tracking-number-display tracking-wider text-primary">{submittedTrackingNumber}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 tracking-result-actions">
                    <button 
                      onClick={openAustraliaPostTracking}
                      className="tracking-result-primary-btn px-6 py-3 rounded-xl transition-all duration-300 font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <div className="flex items-center justify-center space-x-2 ">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                        <span>Open Australia Post Official Tracking</span>
                      </div>
                    </button>
                  </div>
                  
                  <div className="text-center tracking-result-secondary-actions">
                    <p className="text-gray-600 text-sm mb-2">Click the button above to view your tracking results on Australia Post's official website</p>
                    <button 
                      onClick={handleReset}
                      className="tracking-result-link-btn inline-flex items-center font-semibold underline transition-colors text-sm"
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

      {/* FAQ Section */}
      <TrackingFAQ />
    </div>
  );
};

export default Tracking;
