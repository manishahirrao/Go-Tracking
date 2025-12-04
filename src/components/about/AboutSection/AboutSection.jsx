import { FaTruck, FaGlobeAmericas, FaAward, FaUsers } from 'react-icons/fa';
import { useScrollAnimation, useCounterAnimation } from '../../../hooks/useScrollAnimation';
import './AboutSection.css';

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
  const teamRef = useScrollAnimation();

  const statistics = [
    {
      icon: FaTruck,
      value: '15+',
      label: 'Years in Business',
    },
    {
      icon: FaGlobeAmericas,
      value: '50+',
      label: 'Countries Served',
    },
    {
      icon: FaAward,
      value: '1M+',
      label: 'Packages Delivered',
    },
    {
      icon: FaUsers,
      value: '10K+',
      label: 'Happy Customers',
    },
  ];

  const differentiators = [
    {
      title: 'Real-Time Tracking',
      description: 'Track your packages every step of the way with our advanced tracking system.',
    },
    {
      title: 'Competitive Pricing',
      description: 'Get the best rates without compromising on quality and reliability.',
    },
    {
      title: '24/7 Support',
      description: 'Our dedicated team is always available to assist you with any questions.',
    },
    {
      title: 'Global Network',
      description: 'Extensive network spanning over 50 countries for seamless delivery.',
    },
  ];

  return (
    <div className="about-section">
      <div className="about-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Your trusted partner in courier and delivery services</p>
        </div>
      </div>

      <div className="about-content">
        <div className="container">
          {/* Company History & Mission */}
          <div ref={storyRef.ref} className={`about-story ${storyRef.isVisible ? 'animate-in' : ''}`}>
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2008, our courier service began with a simple mission: to provide fast,
                reliable, and affordable delivery solutions for businesses and individuals alike.
                What started as a small local operation has grown into a trusted global logistics
                partner.
              </p>
              <p>
                Over the years, we've invested heavily in technology, infrastructure, and our
                people to ensure that every package we handle receives the care and attention it
                deserves. Today, we're proud to serve customers in over 50 countries, delivering
                millions of packages annually.
              </p>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <FaTruck size={80} />
              </div>
            </div>
          </div>

          {/* Mission & Values */}
          <div ref={missionRef.ref} className={`mission-values ${missionRef.isVisible ? 'animate-in' : ''}`}>
            <div className="mission-card">
              <h3>Our Mission</h3>
              <p>
                To connect people and businesses worldwide through reliable, efficient, and
                innovative delivery solutions that exceed expectations.
              </p>
            </div>
            <div className="values-card">
              <h3>Our Values</h3>
              <ul>
                <li>
                  <strong>Reliability:</strong> We deliver on our promises, every time.
                </li>
                <li>
                  <strong>Innovation:</strong> We continuously improve our services through
                  technology.
                </li>
                <li>
                  <strong>Customer Focus:</strong> Your satisfaction is our top priority.
                </li>
                <li>
                  <strong>Integrity:</strong> We operate with honesty and transparency.
                </li>
              </ul>
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

          {/* Team Section */}
          <div ref={teamRef.ref} className={`team-section ${teamRef.isVisible ? 'animate-in' : ''}`}>
            <h2>Our Team</h2>
            <p className="team-intro">
              Behind every successful delivery is a dedicated team of professionals committed to
              excellence. From our drivers to our customer service representatives, every team
              member plays a crucial role in ensuring your packages arrive safely and on time.
            </p>
            <div className="team-image-placeholder">
              <FaUsers size={60} />
              <p>Our dedicated team working together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
