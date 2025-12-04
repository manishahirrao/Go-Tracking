import { SERVICES } from '../utils/constants';
import ServiceCard from '../components/services/ServiceCard/ServiceCard';
import './Services.css';

const Services = () => {
  const handleServiceExpand = (serviceId) => {
    console.log('Service expanded:', serviceId);
  };

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive shipping solutions for all your delivery needs</p>
        </div>
      </div>

      <div className="services-content">
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} onExpand={handleServiceExpand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
