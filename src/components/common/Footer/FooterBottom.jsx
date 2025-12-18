import './FooterBottom.css';

const FooterBottom = ({ 
  copyrightText = "© Copyright 2025, All rights reserved"
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Go-Tracking. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
