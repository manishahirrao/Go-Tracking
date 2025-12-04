import { useState } from 'react';
import { FaTruck, FaGlobe, FaBolt, FaWarehouse, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './ServiceCard.css';

const iconMap = {
  FaTruck: FaTruck,
  FaGlobe: FaGlobe,
  FaBolt: FaBolt,
  FaWarehouse: FaWarehouse,
};

const ServiceCard = ({ service, onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) {
      onExpand(service.id);
    }
  };

  const IconComponent = iconMap[service.icon] || FaTruck;

  return (
    <div className={`service-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="service-card-header" onClick={handleClick}>
        <div className="service-icon">
          <IconComponent />
        </div>
        <div className="service-info">
          <h3 className="service-name">{service.name}</h3>
          <p className="service-description">{service.description}</p>
          <div className="service-delivery-time">
            <span className="delivery-label">Delivery Time:</span>
            <span className="delivery-value">{service.deliveryTime}</span>
          </div>
        </div>
        <button
          className="expand-button"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isExpanded && (
        <div className="service-card-body">
          <p className="service-long-description">{service.longDescription}</p>
          <div className="service-features">
            <h4>Key Features:</h4>
            <ul>
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
