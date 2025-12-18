import './Legal.css';

const Cookies = () => (
  <div className="legal-page">
    <div className="container">
      <h1 className="legal-title">Cookie Policy</h1>
      <p className="legal-intro">
        This Cookie Policy explains how this independent Australia Post tracking helper website ("we", "our", "us")
        uses cookies and similar technologies when you visit or use our Service.
      </p>

      <section className="legal-section">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device by your browser. They help websites remember information
          about your visit, such as preferences and settings.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. How We Use Cookies</h2>
        <p>We may use cookies to:</p>
        <ul>
          <li>Remember basic preferences (such as language or theme, if applicable).</li>
          <li>Understand how visitors use the website so we can improve its design and features.</li>
          <li>Support security and performance of the Service.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>3. Types of Cookies We May Use</h2>
        <ul>
          <li><strong>Essential cookies</strong> – required for the website to function properly.</li>
          <li><strong>Analytics cookies</strong> – help us understand traffic and usage patterns in an anonymized way.</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>4. Third-Party Cookies</h2>
        <p>
          Some analytics or embedded content providers may set their own cookies in your browser. These cookies are
          subject to the third party's own privacy and cookie policies.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Options typically include:</p>
        <ul>
          <li>Blocking all cookies.</li>
          <li>Blocking cookies from specific sites.</li>
          <li>Deleting cookies when you close your browser.</li>
        </ul>
        <p>
          If you disable some or all cookies, certain features of this website may not function as intended.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated
          revision date.
        </p>
      </section>
    </div>
  </div>
);

export default Cookies;
