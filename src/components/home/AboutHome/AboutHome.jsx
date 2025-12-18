import PropTypes from 'prop-types';
import BackgroundText from '../../common/BackgroundText/BackgroundText';
import './AboutHome.css';

const AboutHome = ({ features }) => {
  const defaultFeatures = [
    {
      icon: '/icons/icon-2.png',
      title: 'Fast Tracking Access',
      description: 'Instantly identify the correct courier and reach the official tracking page without manual searching.'
    },
    {
      icon: '/icons/icon-3.png',
      title: 'Secure & Reliable Experience',
      description: 'We do not store sensitive shipment data. Tracking is handled through secure and trusted sources.'
    },
    {
      icon: '/icons/icon-4.png',
      title: 'Global Courier Coverage',
      description: 'Track shipments across 200+ countries, including international transit and customs updates where supported.'
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
                We are an independent courier tracking assistance platform designed to make parcel tracking simple, fast, and transparent. Our goal is to help users quickly find the correct Australia Post tracking page and access accurate shipment updates without confusion. We focus on user convenience, clarity, and trust, providing a smooth tracking experience for individuals and businesses worldwide — all through an easy-to-use interface.
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
