import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Header = ({ transparent = false, sticky = true }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Tracking', path: '/tracking' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const headerClasses = `
    ${sticky ? 'sticky top-0 z-50' : ''}
    ${transparent ? 'bg-transparent' : 'bg-white shadow-md'}
    transition-all duration-300
  `;

  return (
    <header className={headerClasses}>
      {/* Top Bar */}
      <div className="bg-black text-white">
        <div className="container mx-auto max-w-container px-4">
          <div className="flex justify-between items-center py-2 text-xs">
            <ul className="flex space-x-4">
              <li><Link to="/sitemap" className="hover:text-primary">Sitemap</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy</Link></li>
              <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
            </ul>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-primary" />
              <span>Call us now: <span className="text-primary">+1-800-COURIER</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white">
        <div className="container mx-auto max-w-container px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-secondary font-black text-black uppercase">
                GO <span className="text-primary">Courier</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm font-secondary font-semibold uppercase tracking-wide text-black hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-black hover:text-primary transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in-up">
              <ul className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm font-secondary font-semibold uppercase tracking-wide text-black hover:text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
