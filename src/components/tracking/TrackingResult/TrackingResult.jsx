import PropTypes from 'prop-types';
import { FaBox, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTruck, FaShippingFast } from 'react-icons/fa';
import Timeline from '../Timeline';

const TrackingResult = ({ data, isRealtime = false }) => {
  if (!data) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'border-green shadow-green/20';
      case 'in-transit':
        return 'border-blue shadow-blue/20';
      case 'pending':
        return 'border-primary shadow-primary/20';
      case 'exception':
        return 'border-red shadow-red/20';
      default:
        return 'border-gray shadow-gray/20';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'delivered':
        return { backgroundColor: '#f0fdf4' }; // Light green
      case 'in-transit':
        return { backgroundColor: '#eff6ff' }; // Light blue
      case 'pending':
        return { backgroundColor: '#fffbeb' }; // Light yellow
      case 'exception':
        return { backgroundColor: '#fef2f2' }; // Light red
      default:
        return { backgroundColor: '#f9fafb' }; // Light gray
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'delivered':
        return { color: '#15803d' }; // Dark green
      case 'in-transit':
        return { color: '#1e40af' }; // Dark blue
      case 'pending':
        return { color: '#b45309' }; // Dark orange
      case 'exception':
        return { color: '#dc2626' }; // Dark red
      default:
        return { color: '#4b5563' }; // Dark gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle />;
      case 'in-transit':
        return <FaTruck />;
      case 'pending':
        return <FaClock />;
      default:
        return <FaBox />;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'delivered':
        return 'Your package has been delivered successfully';
      case 'in-transit':
        return 'Your package is on its way';
      case 'pending':
        return 'Your package is being processed';
      default:
        return 'Package status';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in-up">
      {/* Real-time Indicator */}
      {isRealtime && (
        <div className="mb-4 flex items-center justify-center gap-2 text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green"></span>
          </span>
          <span className="font-medium text-green">Live Tracking Active</span>
        </div>
      )}

      {/* Status Banner */}
      <div 
        className={`mb-6 p-6 rounded-lg border-2 shadow-xl ${getStatusColor(data.status)}`}
        style={getStatusBgColor(data.status)}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0" style={{ ...getStatusTextColor(data.status), fontSize: '1.75rem' }}>
              {getStatusIcon(data.status)}
            </div>
            <div>
              <h2 
                className="font-secondary font-black uppercase mb-1" 
                style={{ ...getStatusTextColor(data.status), letterSpacing: '0.5px', fontSize: '1.5rem' }}
              >
                {data.status.replace('-', ' ').replace('_', ' ')}
              </h2>
              <p className="font-medium" style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                {getStatusMessage(data.status)}
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-secondary font-semibold uppercase mb-1" style={{ color: '#718096', letterSpacing: '0.8px', fontSize: '0.7rem' }}>
              Tracking Number
            </p>
            <p className="font-mono font-bold" style={{ color: '#2d3748', fontSize: '1.1rem' }}>
              {data.trackingNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Package Details Card */}
      <div className="bg-white rounded-lg shadow-xl mb-6 overflow-hidden border border-border">
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4">
          <h3 className="font-secondary font-black uppercase text-white flex items-center gap-2" style={{ letterSpacing: '0.8px', fontSize: '1.1rem' }}>
            <FaShippingFast style={{ fontSize: '1.3rem' }} />
            Package Details
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-light-gray p-4 rounded-lg border-l-4 border-primary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h4 className="font-secondary font-bold uppercase mb-2" style={{ color: '#718096', letterSpacing: '1px', fontSize: '0.65rem' }}>
                    Current Location
                  </h4>
                  <p className="font-semibold leading-snug" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                    {data.currentLocation}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light-gray p-4 rounded-lg border-l-4 border-primary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <FaClock className="text-primary mt-1 flex-shrink-0" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h4 className="font-secondary font-bold uppercase mb-2" style={{ color: '#718096', letterSpacing: '1px', fontSize: '0.65rem' }}>
                    Estimated Delivery
                  </h4>
                  <p className="font-semibold leading-snug" style={{ color: '#2d3748', fontSize: '0.875rem' }}>
                    {formatDate(data.estimatedDelivery)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light-gray p-4 rounded-lg border-l-4 border-primary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <FaBox className="text-primary mt-1 flex-shrink-0" style={{ fontSize: '1.5rem' }} />
                <div>
                  <h4 className="font-secondary font-bold uppercase mb-2" style={{ color: '#718096', letterSpacing: '1px', fontSize: '0.65rem' }}>
                    Shipping Route
                  </h4>
                  <p className="font-semibold leading-snug" style={{ color: '#2d3748', fontSize: '0.8rem' }}>
                    {data.origin}
                  </p>
                  <p className="text-primary font-bold my-1" style={{ fontSize: '1rem' }}>↓</p>
                  <p className="font-semibold leading-snug" style={{ color: '#2d3748', fontSize: '0.8rem' }}>
                    {data.destination}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-border">
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4">
          <h3 className="font-secondary font-black uppercase text-white" style={{ letterSpacing: '0.8px', fontSize: '1.1rem' }}>
            Tracking History
          </h3>
        </div>
        <div className="p-6">
          <Timeline history={data.history} />
        </div>
      </div>
    </div>
  );
};

TrackingResult.propTypes = {
  data: PropTypes.shape({
    trackingNumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    currentLocation: PropTypes.string.isRequired,
    estimatedDelivery: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    origin: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
  }),
  isRealtime: PropTypes.bool,
};

export default TrackingResult;
