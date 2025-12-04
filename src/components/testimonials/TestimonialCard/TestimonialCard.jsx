import { FaQuoteLeft } from 'react-icons/fa';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="quote-icon">
        <FaQuoteLeft />
      </div>
      <p className="testimonial-text">{testimonial.text}</p>
      <div className="testimonial-author">
        <img
          src={testimonial.customerPhoto}
          alt={testimonial.customerName}
          className="author-photo"
          loading="lazy"
        />
        <div className="author-info">
          <h4 className="author-name">{testimonial.customerName}</h4>
          {testimonial.company && <p className="author-company">{testimonial.company}</p>}
          {testimonial.location && <p className="author-location">{testimonial.location}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
