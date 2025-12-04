import PropTypes from 'prop-types';
import './MoreAboutUs.css';

const MoreAboutUs = ({ cards }) => {
  const defaultCards = [
    {
      title: 'what we do',
      description: 'We provide comprehensive courier and logistics solutions for businesses and individuals worldwide. From same-day local deliveries to international freight shipping, our services are designed to meet diverse shipping needs with reliability and efficiency. Our advanced tracking technology ensures complete visibility throughout the delivery process.'
    },
    {
      title: 'Our History',
      description: 'Established in 2008, we started as a small local courier service with just 5 delivery vehicles. Through dedication to customer satisfaction and continuous innovation, we have grown into a global logistics provider serving over 200 countries. Our journey reflects our commitment to excellence and adapting to the evolving needs of modern commerce.'
    },
    {
      title: 'our mission',
      description: 'Our mission is to connect people and businesses across the globe through fast, secure, and reliable delivery services. We strive to exceed customer expectations by combining cutting-edge technology with personalized service, ensuring every package is treated with the utmost care and delivered with precision and professionalism.'
    }
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className="pad-30 more-about-wrap">
      <div className="theme-container container pb-100">
        <div className="more-about-grid">
          {displayCards.map((card, index) => (
            <div 
              key={index} 
              className="more-about-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="more-about clrbg-before">
                <h2 className="title-1">{card.title}</h2>
                <div className="pad-10"></div>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

MoreAboutUs.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default MoreAboutUs;
