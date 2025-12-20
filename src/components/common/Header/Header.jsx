import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ sticky = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Tracking', path: '/tracking' },
    { label: 'Blog', path: '/blog' },
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
        >
          <div className="mobile-menu-content">
            {/* Mobile Logo */}
            <div className="mobile-menu-logo">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="logo-text">
                <span className="logo-main">Australia Post</span>
                <span className="logo-sub">Tracking</span>
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <ul className="mobile-menu-nav">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={location.pathname === item.path ? 'active' : ''}
                    style={location.pathname === item.path ? { 
                      color: '#b71521', 
                      fontWeight: '700', 
                      textDecoration: 'none' 
                    } : {}}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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

            {/* Logo - Left Side */}
            <Link to="/" className="navbar-logo logo-text">
              <span className="logo-main">Australia Post</span>
              <span className="logo-sub">Tracking</span>
            </Link>

            {/* Desktop Navigation Only */}
            <div className="navbar-nav">
              <ul className="navbar-nav theme-menu">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={location.pathname === item.path ? 'active' : ''}
                      style={location.pathname === item.path ? { 
                        color: '#b71521', 
                        fontWeight: '700', 
                        textDecoration: 'none' 
                      } : {}}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
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
