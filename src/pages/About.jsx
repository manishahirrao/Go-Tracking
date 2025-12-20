import { useEffect } from 'react';
import AboutSection from '../components/about/AboutSection/AboutSection';
import MoreAboutUs from '../components/about/MoreAboutUs/MoreAboutUs';
import { updateMetaTags } from '../utils/seo';

const About = () => {
  useEffect(() => {
    // Update SEO meta tags for About page
    const aboutMetaData = {
      title: 'About Us - Online Aus Post Tracking',
      description: 'Learn about our online Australia Post tracking service. We provide quick access to official tracking pages and reliable postal information.',
      keywords: 'about Australia Post, online tracking, postal services, about us, company information',
      author: 'Online Aus Post Tracking',
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
