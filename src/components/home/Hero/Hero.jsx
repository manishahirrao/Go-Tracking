import PropTypes from 'prop-types';
import Button from '../../common/Button';
import { Link } from 'react-router-dom';

const Hero = ({ 
  title = "Awesome Template for Courier & Delivery Services",
  subtitle,
  backgroundImage,
  ctaText = "Get Started",
  ctaLink = "/services"
}) => {
  return (
    <section 
      className="relative bg-black text-white py-xl min-h-[600px] flex items-center"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {}}
    >
      <div className="container mx-auto max-w-container px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Feature Tags */}
          <ul className="flex flex-wrap gap-4 mb-6 animate-fade-in-up">
            <li>
              <span className="text-sm font-secondary font-semibold uppercase tracking-wide text-primary hover:text-primary-dark transition-colors cursor-pointer">
                Fast
              </span>
            </li>
            <li>
              <span className="text-sm font-secondary font-semibold uppercase tracking-wide text-primary hover:text-primary-dark transition-colors cursor-pointer">
                Secured
              </span>
            </li>
            <li>
              <span className="text-sm font-secondary font-semibold uppercase tracking-wide text-primary hover:text-primary-dark transition-colors cursor-pointer">
                Worldwide
              </span>
            </li>
          </ul>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-secondary font-black uppercase leading-tight mb-6 animate-fade-in-up animate-delay-1">
            Awesome Template for <br />
            <span className="text-primary">Courier</span> & <span className="text-primary">Delivery</span> Services
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-gray mb-8 animate-fade-in-up animate-delay-2">
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          <div className="animate-fade-in-up animate-delay-3">
            <Link to={ctaLink}>
              <Button variant="primary" size="lg">
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Icon */}
      <div className="absolute top-10 right-10 opacity-20 animate-fade-in-left hidden lg:block">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10L90 30V70L50 90L10 70V30L50 10Z" stroke="currentColor" strokeWidth="2" className="text-primary"/>
        </svg>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
};

export default Hero;
