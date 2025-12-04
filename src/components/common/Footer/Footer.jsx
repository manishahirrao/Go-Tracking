import FooterMain from './FooterMain';
import FooterBottom from './FooterBottom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <FooterMain />
      <FooterBottom 
        copyrightText="© Copyright 2024, All rights reserved"
        designerCredit="GO Courier"
      />
    </footer>
  );
};

export default Footer;
