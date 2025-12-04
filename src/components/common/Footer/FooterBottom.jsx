import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './FooterBottom.css';

const FooterBottom = ({ 
  copyrightText = "© Copyright 2024, All rights reserved",
  designerCredit = "GO Courier"
}) => {
  return (
    <div className="footer-bottom">
      <div className="theme-container container">
        <div className="footer-bottom-content">
          <div className="copyright">
            <p>
              {copyrightText} | <Link to="/cookie-policy" className="footer-link">Cookie Policy</Link>
            </p>
          </div>
          <div className="designer-credit">
            <p>
              Made with <FaHeart className="theme-clr heart-icon" /> by{' '}
              <Link to="/" className="main-clr">
                {designerCredit}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

FooterBottom.propTypes = {
  copyrightText: PropTypes.string,
  designerCredit: PropTypes.string
};

export default FooterBottom;
