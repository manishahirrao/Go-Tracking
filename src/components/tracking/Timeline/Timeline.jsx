import PropTypes from 'prop-types';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

const Timeline = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      <h3 className="text-xl font-secondary font-bold uppercase mb-6 text-black">
        Tracking History
      </h3>
      
      <div className="space-y-6">
        {history.map((event, index) => {
          const isLatest = index === history.length - 1;
          const isFirst = index === 0;
          
          return (
            <div key={index} className="relative pl-8">
              {/* Timeline line */}
              {!isFirst && (
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border -translate-y-6"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1">
                {isLatest ? (
                  <FaCheckCircle className="text-2xl text-primary" />
                ) : (
                  <FaCircle className="text-lg text-gray" />
                )}
              </div>
              
              {/* Event content */}
              <div className={`pb-6 ${isLatest ? 'animate-fade-in-left' : ''}`}>
                <div className="bg-white p-4 rounded-sm shadow-sm border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="font-secondary font-semibold uppercase text-black">
                      {event.status}
                    </h4>
                    <span className="text-sm text-gray">
                      {formatDate(event.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-light-gray mb-1">
                    <strong>Location:</strong> {event.location}
                  </p>
                  
                  <p className="text-sm text-light-gray">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Timeline.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      status: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Timeline;
