import './Legal.css';

const Terms = () => (
  <div className="legal-page">
    <div className="container">
      <h1 className="legal-title">Terms of Service</h1>
      <p className="legal-intro">
        These Terms of Service ("Terms") govern your use of this independent Australia Post tracking helper website
        (the "Service"). By using this website, you agree to these Terms.
      </p>

      <section className="legal-section">
        <h2>1. Nature of the Service</h2>
        <p>
          This Service is a third-party tool that helps you quickly access official Australia Post tracking pages.
          We do not operate Australia Post, and we do not control any postal or delivery operations.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. No Affiliation with Australia Post</h2>
        <p>
          We are not affiliated with, endorsed by, or officially connected to Australia Post. Any trademarks,
          logos, or brand names mentioned on this site are the property of their respective owners.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. No Guarantee of Accuracy</h2>
        <p>
          Tracking information and delivery statuses are provided by Australia Post or other official sources.
          We cannot guarantee the accuracy, completeness, or timeliness of any tracking data you access through this Service.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use this Service for any unlawful, fraudulent, or abusive purpose.</li>
          <li>Attempt to interfere with or disrupt the normal operation of the website.</li>
          <li>Scrape, copy, or reuse the Service in a way that violates applicable laws.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>5. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, or consequential
          damages arising from your use of this Service, including but not limited to delivery issues, lost parcels,
          or inaccurate tracking information.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Changes to the Service</h2>
        <p>
          We may modify, suspend, or discontinue any part of the Service at any time without prior notice. We may also
          update these Terms from time to time. Continued use of the Service after changes are posted constitutes your
          acceptance of the updated Terms.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Governing Law</h2>
        <p>
          These Terms are governed by the laws applicable in your jurisdiction, without regard to conflict of law principles.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Contact</h2>
        <p>
          If you have questions about these Terms, please contact us using the contact options provided on this site.
        </p>
      </section>
    </div>
  </div>
);

export default Terms;
