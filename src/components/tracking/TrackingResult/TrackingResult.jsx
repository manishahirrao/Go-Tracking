import PropTypes from 'prop-types';
import { FaBox, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import Timeline from '../Timeline';

const TrackingResult = ({ data }) => {
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
        return 'text-green bg-green/10 border-green';
      case 'in-transit':
        return 'text-blue bg-blue/10 border-blue';
      case 'pending':
        return 'text-primary bg-primary/10 border-primary';
      case 'exception':
        return 'text-red bg-red/10 border-red';
      default:
        return 'text-gray bg-gray/10 border-gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="text-2xl" />;
      case 'in-transit':
        return <FaBox className="text-2xl" />;
      default:
        return <FaClock className="text-2xl" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      {/* Status Card */}
      <div className="bg-white p-8 rounded-sm shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-secondary font-black uppercase mb-2 text-black">
              Tracking Number
            </h2>
            <p className="text-xl font-mono text-primary">
              {data.trackingNumber}
            </p>
          </div>
          <div className={`flex items-center space-x-3 px-6 py-3 rounded-sm border-2 ${getStatusColor(data.status)}`}>
            {getStatusIcon(data.status)}
            <span className="font-secondary font-bold uppercase">
              {data.status.replace('-', ' ')}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <FaMapMarkerAlt className="text-2xl text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-secondary font-semibold uppercase text-sm text-gray mb-1">
                Current Location
              </h3>
              <p className="text-black">
                {data.currentLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaClock className="text-2xl text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-secondary font-semibold uppercase text-sm text-gray mb-1">
                Estimated Delivery
              </h3>
              <p className="text-black">
                {formatDate(data.estimatedDelivery)}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FaBox className="text-2xl text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-secondary font-semibold uppercase text-sm text-gray mb-1">
                Route
              </h3>
              <p className="text-black text-sm">
                {data.origin} → {data.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white p-8 rounded-sm shadow-lg">
        <Timeline history={data.history} />
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
};

export default TrackingResult;
