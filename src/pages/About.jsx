import { useEffect } from 'react';
import AboutSection from '../components/about/AboutSection/AboutSection';
import MoreAboutUs from '../components/about/MoreAboutUs/MoreAboutUs';
import { updateMetaTags } from '../utils/seo';

const About = () => {
  useEffect(() => {
    // Update SEO meta tags for About page
    const aboutMetaData = {
      title: 'About Us - Australia Post Tracking Helper',
      description: 'Learn about our independent Australia Post tracking helper service. We provide quick access to official tracking pages and reliable postal information.',
      keywords: 'about Australia Post, tracking helper, postal services, about us, company information',
      author: 'Australia Post Tracking Helper',
      url: 'https://australiaposttracking.online/about',
      image: '/logo-black.png',
      ogType: 'website',
      twitterCard: 'summary_large_image'
    };
    updateMetaTags(aboutMetaData);
  }, []);

  return (
    <div>
      <AboutSection />
      
    </div>
  );
};

export default About;
