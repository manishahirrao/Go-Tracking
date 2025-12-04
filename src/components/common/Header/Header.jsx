import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import TopBar from './TopBar';
import SearchOverlay from './SearchOverlay';
import LoginModal from '../../auth/LoginModal/LoginModal';
import './Header.css';

const Header = ({ transparent = false, sticky = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Tracking', path: '/tracking' },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    setSearchOpen(false);
    // Implement search functionality here
  };

  const handleSignIn = () => {
    setLoginModalOpen(true);
  };

  const handleLogin = (credentials) => {
    console.log('Login credentials:', credentials);
    setLoginModalOpen(false);
    // Implement login logic here
  };

  const headerClasses = `header-main ${sticky ? 'sticky' : ''}`;

  return (
    <header className={headerClasses}>
      {/* Top Bar */}
      <TopBar showSignIn={true} onSignInClick={handleSignIn} />

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        onSearch={handleSearch}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />

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
                <li>
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="search-btn"
                    aria-label="Open search"
                  >
                    <FaSearch className="theme-clr" />
                  </button>
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
  transparent: PropTypes.bool,
  sticky: PropTypes.bool,
};

export default Header;
