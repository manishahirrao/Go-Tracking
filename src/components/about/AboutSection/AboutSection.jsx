import { FaTruck, FaGlobeAmericas, FaAward } from 'react-icons/fa';
import { useScrollAnimation, useCounterAnimation } from '../../../hooks/useScrollAnimation';
import './AboutSection.css';
import MoreAboutUs from '../MoreAboutUs/MoreAboutUs';

const StatCard = ({ stat, index }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  // Extract numeric value from stat.value (e.g., "15+" -> 15)
  const numericValue = parseInt(stat.value.replace(/\D/g, ''), 10) || 0;
  const suffix = stat.value.replace(/[0-9]/g, '');
  
  const count = useCounterAnimation(numericValue, 2000, isVisible);

  return (
    <div
      ref={ref}
      className={`stat-card ${isVisible ? 'animate-in' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="stat-icon">
        <stat.icon />
      </div>
      <div className="stat-value">
        {isVisible ? `${count}${suffix}` : stat.value}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
};

const AboutSection = () => {
  const storyRef = useScrollAnimation();
  const missionRef = useScrollAnimation();
  const diffRef = useScrollAnimation();

  const statistics = [
    {
      icon: FaTruck,
      value: '15K+',
      label: 'Shipments Helped to Track',
    },
    {
      icon: FaGlobeAmericas,
      value: '1',
      label: 'Courier Focused (Australia Post)',
    },
    {
      icon: FaAward,
      value: '4.8',
      label: 'Average User Satisfaction ()',
    },
    {
      icon: FaTruck,
      value: '99%',
      label: 'Successful Redirects to Official Page',
    },
  ];

  const differentiators = [
    {
      title: 'Simple Tracking Flow',
      description: 'Enter your Australia Post tracking ID once and go directly to the official tracking results.',
    },
    {
      title: 'Independent & Transparent',
      description: 'We clearly state that were not an official Australia Post service and always send you to their site for final details.',
    },
    {
      title: 'Privacy-First',
      description: 'We only use your tracking number to route you; we dont use it to create shipments or manage deliveries.',
    },
    {
      title: 'Clear Status Guidance',
      description: 'We explain what each tracking status means so you understand your shipment at a glance.',
    },
  ];

  return (
    <div className="about-section">
      <div className="about-hero">
        <div className="container">
          <h1>About This Tracker</h1>
          <p>Independent helper for tracking your Australia Post shipments</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          {/* Company History & Mission */}
          <div ref={storyRef.ref} className={`about-story ${storyRef.isVisible ? 'animate-in' : ''}`}>
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                This tracker was created to solve a simple problem: finding and tracking Australia Post
                shipments quickly without digging through multiple pages. Many users just want a clean
                place to enter a tracking number and go straight to the official tracking details.
              </p>
              <p>
                We are not affiliated with or endorsed by Australia Post. Instead, we focus on providing
                a clear, user-friendly interface that helps you jump directly to the correct official
                tracking page with confidence.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="/Courier5.jpg" 
                alt="Our Courier Service Story" 
                className="story-img"
              />
            </div>
          </div>

          {/* Mission & Values */}
          <div ref={missionRef.ref} className={`mission-values-section ${missionRef.isVisible ? 'animate-in' : ''}`}>
            <MoreAboutUs/>
          </div>

          {/* Core Values */}
          <div className="values-section">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <span>🎯</span>
                </div>
                <h3>Reliability</h3>
                <p>We deliver on our promises, every time. Your trust is our foundation.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <span>💡</span>
                </div>
                <h3>Innovation</h3>
                <p>We continuously improve our services through cutting-edge technology.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <span>❤️</span>
                </div>
                <h3>Customer Focus</h3>
                <p>Your satisfaction is our top priority in everything we do.</p>
              </div>
              <div className="value-card">
                <div className="value-icon">
                  <span>✨</span>
                </div>
                <h3>Integrity</h3>
                <p>We operate with honesty, transparency, and ethical practices.</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="statistics-section">
            <h2>Our Impact</h2>
            <div className="statistics-grid">
              {statistics.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>

          {/* Key Differentiators */}
          <div ref={diffRef.ref} className={`differentiators-section ${diffRef.isVisible ? 'animate-in' : ''}`}>
            <h2>What Sets Us Apart</h2>
            <div className="differentiators-grid">
              {differentiators.map((item, index) => (
                <div key={index} className="differentiator-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
