import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import AboutHome from '../components/home/AboutHome/AboutHome';
import Steps from '../components/home/Steps/Steps';
import ProductDelivery from '../components/home/ProductDelivery/ProductDelivery';
import TestimonialCarousel from '../components/testimonials/TestimonialCarousel/TestimonialCarousel';
import FAQHome from '../components/home/FAQHome/FAQHome';
import { TESTIMONIALS } from '../utils/constants';
import { updateMetaTags } from '../utils/seo';
import './Home.css';


const Home = () => {
  useEffect(() => {
    // Update SEO meta tags for Home page
    const homeMetaData = {
      title: 'Australia Post Tracking - Fast & Reliable Package Tracking Helper',
      description: 'Independent Australia Post tracking helper. Quick access to official tracking pages. Fast, reliable, and easy to use.',
      keywords: 'Australia Post tracking, package tracking, shipment tracking, delivery tracking, postal tracking',
      author: 'Australia Post Tracking Helper',
      url: 'https://australiaposttracking.online/',
      image: '/logo-black.png',
      ogType: 'website',
      twitterCard: 'summary_large_image'
    };
    updateMetaTags(homeMetaData);
  }, []);

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
