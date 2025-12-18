import './Legal.css';

const Disclaimer = () => (
  <div className="legal-page">
    <div className="container">
      <h1 className="legal-title">Disclaimer</h1>
      <p className="legal-intro">
        This website is an independent Australia Post tracking helper and is not affiliated with, endorsed by,
        or officially connected to Australia Post.
      </p>

      <section className="legal-section">
        <h2>1. No Official Affiliation</h2>
        <p>
          Australia Post is a separate and independent entity. All trademarks, service marks, and logos related to
          Australia Post are the property of their respective owners.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Purpose of This Website</h2>
        <p>
          The sole purpose of this website is to help users quickly access official Australia Post tracking pages and
          related resources. We do not handle, manage, or deliver parcels.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. No Guarantee of Information</h2>
        <p>
          Tracking information accessed through this website is provided by Australia Post or other official sources.
          We do not guarantee the accuracy, completeness, or timeliness of any information displayed.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. No Liability for Deliveries</h2>
        <p>
          We are not responsible for lost, damaged, delayed, or misdirected parcels. Any questions or claims related
          to deliveries must be directed to Australia Post or the relevant courier.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. External Links</h2>
        <p>
          Our website may contain links to third-party sites, including official Australia Post pages. We are not
          responsible for the content, security, or practices of any external websites.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Use at Your Own Risk</h2>
        <p>
          Your use of this website is at your own risk. By using this Service, you agree that we are not liable for any
          damages resulting from your use of or inability to use the website.
        </p>
      </section>
    </div>
  </div>
);

export default Disclaimer;
