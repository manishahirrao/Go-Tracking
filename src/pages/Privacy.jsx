import { useEffect } from 'react';
import './Legal.css';
import { updateMetaTags } from '../utils/seo';

const Privacy = () => {
  useEffect(() => {
    // Update SEO meta tags for Privacy page
    const privacyMetaData = {
      title: 'Privacy Policy - Australia Post Tracking Helper',
      description: 'Read our privacy policy to understand how we handle your information when using our Australia Post tracking helper service.',
      keywords: 'privacy policy, data protection, Australia Post tracking, user privacy, personal information',
      author: 'Australia Post Tracking Helper',
      url: 'https://australiaposttracking.online/privacy',
      image: '/logo-black.png',
      ogType: 'website',
      twitterCard: 'summary'
    };
    updateMetaTags(privacyMetaData);
  }, []);

  return (
  <div className="legal-page">
    <div className="container">
      <h1 className="legal-title">Privacy Policy</h1>
      <p className="legal-intro">
        This Privacy Policy explains how this independent Australia Post tracking helper website ("we", "our", or "us")
        handles information when you use our tools to access official Australia Post tracking pages.
      </p>

      <section className="legal-section">
        <h2>1. What This Site Does</h2>
        <p>
          We provide a convenience interface that helps you quickly navigate to official Australia Post tracking pages.
          We do not operate any postal or delivery services, and we do not control Australia Post systems.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Information We Collect</h2>
        <p>When you use this site, we may process:</p>
        <ul>
          <li>Tracking numbers you enter into our forms.</li>
          <li>Basic technical data such as your browser type, device, and approximate location (via analytics tools).</li>
          <li>Usage data like pages visited and buttons clicked.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Redirect you to the correct official Australia Post tracking page.</li>
          <li>Improve the performance, reliability, and usability of this website.</li>
          <li>Monitor anonymous usage trends (for example, most used features).</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Sharing of Information</h2>
        <p>
          We do not sell your personal information. Tracking numbers you enter are used only to redirect you to
          official Australia Post resources or to show you the correct outbound link.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Third-Party Services</h2>
        <p>
          We may use third-party services such as analytics or error monitoring tools. These services may collect
          anonymized technical data about your visit in accordance with their own privacy policies.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Data Retention</h2>
        <p>
          We do not intentionally store tracking numbers long term. Any logs or analytics data are retained only for as
          long as necessary to operate and improve the site.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Your Choices</h2>
        <ul>
          <li>You may choose not to use this site and instead go directly to the official Australia Post website.</li>
          <li>You can clear your browser cookies or use private browsing modes to limit tracking.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>8. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us using the contact options provided on this site.
        </p>
      </section>
    </div>
  </div>
  );
};

export default Privacy;
