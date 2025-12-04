import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FooterTop.css';

const FooterTop = ({ ctaText = "Get Started Today", ctaLink = "/contact" }) => {
  return (
    <div className="footer-top">
      <div className="theme-container container">
        <div className="footer-top-content">
          <h3 className="footer-top-title">Ready to Ship with Us?</h3>
          <p className="footer-top-subtitle">
            Experience fast, secure, and reliable delivery services worldwide
          </p>
          <Link to={ctaLink} className="footer-cta-btn">
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};

FooterTop.propTypes = {
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string
};

export default FooterTop;
