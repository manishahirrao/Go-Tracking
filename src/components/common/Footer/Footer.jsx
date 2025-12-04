import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto max-w-container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section with Logo */}
          <div>
            {/* Logo */}
            <Link to="/" className="inline-flex items-center mb-4 group">
              <div className="bg-primary p-2 rounded mr-2 group-hover:bg-primary-dark transition-colors">
                <FaTruck className="text-white text-xl" />
              </div>
              <span className="text-xl font-secondary font-black text-white uppercase">
                GO <span className="text-primary">Courier</span>
              </span>
            </Link>
            <p className="text-sm text-gray leading-relaxed mb-4">
              Your trusted partner in fast, secure, and reliable courier services. 
              Delivering excellence across the globe with every package, every time.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray hover:text-primary transition-colors hover:scale-110 transform" aria-label="Facebook">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="text-gray hover:text-primary transition-colors hover:scale-110 transform" aria-label="Twitter">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="text-gray hover:text-primary transition-colors hover:scale-110 transform" aria-label="Instagram">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="text-gray hover:text-primary transition-colors hover:scale-110 transform" aria-label="LinkedIn">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-secondary font-bold uppercase mb-4 text-white border-b-2 border-primary pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm mt-4">
              <li><Link to="/" className="text-gray hover:text-primary transition-colors hover:translate-x-1 inline-block">→ Home</Link></li>
              <li><Link to="/about" className="text-gray hover:text-primary transition-colors hover:translate-x-1 inline-block">→ About Us</Link></li>
              <li><Link to="/services" className="text-gray hover:text-primary transition-colors hover:translate-x-1 inline-block">→ Services</Link></li>
              <li><Link to="/tracking" className="text-gray hover:text-primary transition-colors hover:translate-x-1 inline-block">→ Track Package</Link></li>
              <li><Link to="/pricing" className="text-gray hover:text-primary transition-colors hover:translate-x-1 inline-block">→ Pricing</Link></li>
              <li><Link to="/contact" className="text-gray hover:text-primary transition-colors hover:translate-x-1 inline-block">→ Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-secondary font-bold uppercase mb-4 text-white border-b-2 border-primary pb-2 inline-block">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm mt-4">
              <li className="text-gray hover:text-white transition-colors cursor-pointer">✓ Domestic Shipping</li>
              <li className="text-gray hover:text-white transition-colors cursor-pointer">✓ International Shipping</li>
              <li className="text-gray hover:text-white transition-colors cursor-pointer">✓ Express Delivery</li>
              <li className="text-gray hover:text-white transition-colors cursor-pointer">✓ Freight Services</li>
              <li className="text-gray hover:text-white transition-colors cursor-pointer">✓ Package Tracking</li>
              <li className="text-gray hover:text-white transition-colors cursor-pointer">✓ Cost Calculator</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-secondary font-bold uppercase mb-4 text-white border-b-2 border-primary pb-2 inline-block">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-sm mt-4">
              <li className="flex items-start space-x-3 group">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray group-hover:text-white transition-colors">
                  123 Shipping Lane<br />
                  New York, NY 10001<br />
                  United States
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <FaPhone className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+18002687437" className="text-gray group-hover:text-primary transition-colors">
                  +1 (800) 268-7437
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <FaEnvelope className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:support@gocourier.com" className="text-gray group-hover:text-primary transition-colors">
                  support@gocourier.com
                </a>
              </li>
            </ul>
            <div className="mt-5 bg-dark-gray p-3 rounded">
              <p className="text-xs text-gray leading-relaxed">
                <strong className="text-white">Business Hours:</strong><br />
                <span className="text-primary">Mon-Fri:</span> 8:00 AM - 6:00 PM<br />
                <span className="text-primary">Saturday:</span> 9:00 AM - 4:00 PM<br />
                <span className="text-primary">Sunday:</span> Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-gray mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray">
              &copy; {currentYear} <span className="text-white font-semibold">GO Courier</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/privacy" className="text-gray hover:text-primary transition-colors">Privacy Policy</Link>
              <span className="text-dark-gray">|</span>
              <Link to="/terms" className="text-gray hover:text-primary transition-colors">Terms of Service</Link>
              <span className="text-dark-gray">|</span>
              <Link to="/sitemap" className="text-gray hover:text-primary transition-colors">Sitemap</Link>
            </div>
            <p className="text-xs text-gray">
              Made with <span className="text-primary">❤</span> for fast delivery
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
