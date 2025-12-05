import Hero from '../components/home/Hero';
import AboutHome from '../components/home/AboutHome/AboutHome';
import CalculateHome from '../components/home/CalculateHome/CalculateHome';
import Steps from '../components/home/Steps/Steps';
import ProductDelivery from '../components/home/ProductDelivery/ProductDelivery';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel/TestimonialCarousel';
import { TESTIMONIALS } from '../utils/constants';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutHome />
      <Steps />
      <ProductDelivery />
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Real feedback from businesses and individuals who trust us with their deliveries
          </p>
          <TestimonialCarousel testimonials={TESTIMONIALS} autoAdvance={true} interval={2000} />
        </div>
      </section>
      <CalculateHome />
    </div>
  );
};

export default Home;
