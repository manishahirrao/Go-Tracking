import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Features from '../components/home/Features';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel/TestimonialCarousel';
import { TESTIMONIALS } from '../utils/constants';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Hero 
        title="Awesome Template for Courier & Delivery Services"
        subtitle="Fast, Secure, and Reliable Delivery Services Worldwide"
        ctaText="Get Started"
        ctaLink="/services"
      />
      <Services />
      <Features />
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          <TestimonialCarousel testimonials={TESTIMONIALS} autoAdvance={true} interval={5000} />
        </div>
      </section>
    </div>
  );
};

export default Home;
