import { Link } from 'react-router-dom';
import './FooterMain.css';

const FooterMain = () => {
  const quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'Track Package', url: '/tracking' },
    { label: 'About', url: '/about' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', url: '/privacy' },
    { label: 'Terms of Service', url: '/terms' },
    { label: 'Cookie Policy', url: '/cookies' },
    { label: 'Disclaimer', url: '/disclaimer' },
  ];

  return (
    <div className="footer-main">
      <div className="theme-container container">
        <div className="footer-grid">
          {/* Logo Column */}
          <div className="footer-widget">
            <Link to="/">
              <img className="footer-logo" alt="Australia Post Tracking Helper" src="/logo-2.png" />
            </Link>
            <p className="footer-description">
              Your independent Australia Post tracking helper. Quick access to official tracking pages.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="footer-widget">
            <h2 className="title-1 fw-900">Quick Links</h2>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Pages Column */}
          <div className="footer-widget">
            <h2 className="title-1 fw-900">Legal</h2>
            <ul className="footer-links">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.url}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Horizontal Disclaimer at Bottom */}
      <div className="footer-disclaimer-bottom">
        <div className="theme-container container">
          <p className="disclaimer-text">
            Independent tracking platform - Not affiliated with Australia Post. All data redirects to official sites. 
            <Link to="/disclaimer" className="disclaimer-link">Full Disclaimer</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;
