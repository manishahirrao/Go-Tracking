import PropTypes from 'prop-types';
import './MoreAboutUs.css';

const MoreAboutUs = ({ cards }) => {
  const defaultCards = [
    {
      title: 'What We Do',
      description:
        'We help you quickly access the official Australia Post tracking page for your parcel. Instead of searching through menus, you enter your tracking number once and we guide you straight to the right place.',
    },
    {
      title: 'How We Work',
      description:
        'You enter your tracking ID here, we verify the format, and then we open the official Australia Post tracking details in a new tab. All final shipment information always comes from Australia Post directly.',
    },
    {
      title: 'Our Mission',
      description:
        'Our mission is to make Australia Post tracking simple, clear, and stress-free. We are an independent online service—never a replacement for the official AusPost website.',
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className="pad-30 more-about-wrap">
      <div className="theme-container container pb-100">
        <div className="more-about-grid">
          {displayCards.map((card, index) => (
            <div 
              key={index} 
              className="more-about-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="more-about clrbg-before">
                <h2 className="title-1">{card.title}</h2>
                <div className="pad-10"></div>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

MoreAboutUs.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default MoreAboutUs;
