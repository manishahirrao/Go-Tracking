import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhone } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ sticky = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Tracking', path: '/tracking' },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerClasses = `header-main ${sticky ? 'sticky' : ''}`;

  return (
    <header className={headerClasses}>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Navigation */}
      <nav className="menu-bar">
        <div className="theme-container container">
          <div className="nav-wrapper">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="navbar-toggle"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            {/* Logo */}
            <Link to="/" className="navbar-logo">
              <img 
                src="/logo-black.png" 
                alt="GO Courier Logo"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className={`navbar-collapse ${mobileMenuOpen ? 'open' : ''}`}>
              <ul className="navbar-nav theme-menu">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="nav-phone">
                  <a href="tel:+18005550123" className="phone-link">
                    <FaPhone className="phone-icon" />
                    <span>+1 (800) 555-0123</span>
                  </a>
                </li>
                <li>
                  <Link 
                    to="/quote"
                    onClick={() => setMobileMenuOpen(false)}
                    className="quote-btn"
                    aria-label="Get a quote"
                  >
                    <span>Get a Quote</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  sticky: PropTypes.bool,
};

export default Header;
