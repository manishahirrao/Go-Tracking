import PropTypes from 'prop-types';
import { FaCheckCircle, FaCircle, FaDotCircle, FaMapMarkerAlt } from 'react-icons/fa';

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

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative">
      <div className="space-y-0">
        {history.map((event, index) => {
          const isLatest = index === history.length - 1;
          const isFirst = index === 0;
          
          return (
            <div key={index} className="relative pl-12 pb-6 last:pb-0">
              {/* Timeline line */}
              {!isFirst && (
                <div className="absolute left-4 top-0 w-0.5 h-full bg-gradient-to-b from-primary to-border -translate-y-6"></div>
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-1">
                <div className={`relative ${isLatest ? 'animate-pulse' : ''}`}>
                  {isLatest ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" style={{ width: '1.75rem', height: '1.75rem' }}></div>
                      <FaCheckCircle className="relative text-primary" style={{ fontSize: '1.75rem' }} />
                    </div>
                  ) : (
                    <FaDotCircle className="text-primary opacity-60" style={{ fontSize: '1.5rem' }} />
                  )}
                </div>
              </div>
              
              {/* Event content */}
              <div className={`${isLatest ? 'animate-fade-in-left' : ''}`}>
                <div className={`bg-gradient-to-r ${
                  isLatest 
                    ? 'from-primary/5 to-transparent border-l-4 border-primary shadow-lg' 
                    : 'from-light-gray to-transparent border-l-2 border-border'
                } p-4 rounded-r-lg transition-all hover:shadow-md`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <div>
                      <h4 className={`font-secondary font-bold uppercase ${
                        isLatest ? 'text-primary' : ''
                      }`} style={{ 
                        color: isLatest ? undefined : '#1a1a1a',
                        letterSpacing: '0.6px',
                        fontSize: '0.875rem'
                      }}>
                        {event.status}
                      </h4>
                      {isLatest && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary text-white font-bold uppercase rounded-full" style={{ letterSpacing: '0.4px', fontSize: '0.65rem' }}>
                          Latest Update
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold" style={{ color: '#2d3748', fontSize: '0.8rem' }}>
                        {formatDateOnly(event.date)}
                      </div>
                      <div className="font-medium" style={{ color: '#718096', fontSize: '0.7rem' }}>
                        {formatTime(event.date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 mb-1">
                    <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" style={{ fontSize: '0.875rem' }} />
                    <p className="font-semibold leading-relaxed" style={{ color: '#2d3748', fontSize: '0.8rem' }}>
                      {event.location}
                    </p>
                  </div>
                  
                  <p className="leading-relaxed pl-5" style={{ color: '#4a5568', fontSize: '0.75rem' }}>
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
      date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
      status: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Timeline;
