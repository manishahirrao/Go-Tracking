import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import AboutHome from '../components/home/AboutHome/AboutHome';
import Steps from '../components/home/Steps/Steps';
import ProductDelivery from '../components/home/ProductDelivery/ProductDelivery';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel/TestimonialCarousel';
import FAQHome from '../components/home/FAQHome/FAQHome';
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
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Real feedback from people who rely on this tool to quickly access their official Australia Post tracking updates
          </p>
          <TestimonialCarousel testimonials={TESTIMONIALS} autoAdvance={true} interval={2000} />
        </div>
      </section>
      <FAQHome />
    </div>
  );
};

export default Home;
