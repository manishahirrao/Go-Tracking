import { FaPhone } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './TopBar.css';

const TopBar = ({ showSignIn = true, onSignInClick }) => {
  return (
    <div className="top-bar">
      <div className="theme-container container">
        <div className="top-bar-content">
          <div className="top-bar-left">
            <ul className="list-items fs-10">
              <li><a href="/about">About</a></li>
              <li><a href="/tracking">Track Package</a></li>
              <li><a href="/contact">Support</a></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <p className="contact-num fs-12">
              <FaPhone className="phone-icon" /> 
              Call us now: <span className="theme-clr">+1 (800) 555-0123</span>
            </p>
          </div>
        </div>
      </div>
      {showSignIn && (
        <button 
          onClick={onSignInClick}
          className="sign-in fs-12 theme-clr-bg"
          aria-label="Sign in"
        >
          sign in
        </button>
      )}
    </div>
  );
};

TopBar.propTypes = {
  showSignIn: PropTypes.bool,
  onSignInClick: PropTypes.func
};

export default TopBar;
