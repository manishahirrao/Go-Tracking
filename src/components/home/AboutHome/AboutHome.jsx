import PropTypes from 'prop-types';
import BackgroundText from '../../common/BackgroundText/BackgroundText';
import './AboutHome.css';

const AboutHome = ({ features }) => {
  const defaultFeatures = [
    {
      icon: '/icons/icon-2.png',
      title: 'Fast delivery',
      description: 'Express shipping options with same-day and next-day delivery available'
    },
    {
      icon: '/icons/icon-3.png',
      title: 'secured service',
      description: 'Full insurance coverage and secure handling for all your packages'
    },
    {
      icon: '/icons/icon-4.png',
      title: 'worldwide shipping',
      description: 'International delivery to over 200 countries with customs support'
    }
  ];

  const featuresToDisplay = features || defaultFeatures;

  return (
    <section className="about-home-section pad-80 about-wrap clrbg-before">
      <BackgroundText text="About" position="left" />
      <div className="theme-container container">
        <div className="about-home-grid">
          <div className="about-home-content">
            <div className="about-us">
              <h2 className="section-title pb-10">About Us</h2>
              <p className="fs-16">
                With over 15 years of experience in the courier industry, we've built a reputation 
                for reliability, speed, and exceptional customer service. Our state-of-the-art tracking 
                system and dedicated team ensure your packages arrive safely and on time, every time. 
                We serve thousands of satisfied customers worldwide, from individuals to large enterprises.
              </p>
              <ul className="feature-list">
                {featuresToDisplay.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <img
                      alt={feature.title}
                      src={feature.icon}
                      className="feature-icon"
                    />
                    <div className="feature-content">
                      <h2 className="title-1">{feature.title}</h2>
                      <p>{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about-home-image ">
            <img
              alt="About GO Courier"
              src="/Courier2.jpg"
              className="about-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

AboutHome.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default AboutHome;
