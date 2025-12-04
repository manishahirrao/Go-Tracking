import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './FooterMain.css';

const FooterMain = () => {
  const quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'Track Package', url: '/tracking' },
    { label: 'About Us', url: '/about' },
    { label: 'Contact Us', url: '/contact' }
  ];

  const importantLinks = [
    { label: 'FAQ', url: '/faq' },
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Terms & Conditions', url: '/terms-conditions' },
    { label: 'Refund Policy', url: '/refund-policy' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/gocourier', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/gocourier', label: 'Twitter' },
    { icon: <FaInstagram />, url: 'https://instagram.com/gocourier', label: 'Instagram' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/company/gocourier', label: 'LinkedIn' }
  ];

  return (
    <div className="footer-main pad-120 white-clr">
      <div className="theme-container container">
        <div className="footer-grid">
          {/* Logo Column */}
          <div className="footer-widget">
            <Link to="/">
              <img className="footer-logo" alt="GO Courier Logo" src="/logo-white.png" />
            </Link>
            <p className="footer-description">
              Your trusted courier partner since 2008. Fast, secure, and reliable delivery 
              services to over 200 countries worldwide. Available 24/7 for all your shipping needs.
            </p>
            <div className="footer-contact-info">
              <p><strong>Email:</strong> support@gocourier.com</p>
              <p><strong>Phone:</strong> +1 (800) 555-0123</p>
              <p><strong>Hours:</strong> 24/7 Customer Support</p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-widget">
            <h2 className="title-1 fw-900">quick links</h2>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links Column */}
          <div className="footer-widget">
            <h2 className="title-1 fw-900">legal</h2>
            <ul className="footer-links">
              {importantLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="footer-widget">
            <h2 className="title-1 fw-900">get in touch</h2>
            <ul className="social-icons list-inline">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-icon"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
            <div className="payment-icons-wrapper">
              <p className="payment-label">We Accept:</p>
              <ul className="payment-icons list-inline">
                <li>
                  <img alt="Visa" src="/icons/payment-1.png" />
                </li>
                <li>
                  <img alt="Mastercard" src="/icons/payment-2.png" />
                </li>
                <li>
                  <img alt="PayPal" src="/icons/payment-3.png" />
                </li>
                <li>
                  <img alt="American Express" src="/icons/payment-4.png" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
