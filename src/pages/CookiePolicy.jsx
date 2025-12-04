import PageHeader from '../components/common/PageHeader/PageHeader';
import './LegalPage.css';

const CookiePolicy = () => {
  return (
    <div className="legal-page">
      <PageHeader 
        title="Cookie Policy"
        subtitle="How we use cookies and tracking technologies"
      />

      <section className="legal-content">
        <div className="theme-container container">
          <div className="legal-container">
            <div className="legal-intro">
              <p className="last-updated">Last Updated: December 5, 2024</p>
              <p>
                This Cookie Policy explains how GO Courier uses cookies and similar tracking technologies 
                on our website. By using our website, you consent to the use of cookies as described in 
                this policy.
              </p>
            </div>

            <div className="legal-section">
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your device when you visit a website. 
                They help websites remember your preferences and improve your browsing experience.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Types of Cookies We Use</h2>

              <h3>Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core 
                functionality such as security, network management, and accessibility.
              </p>
              <ul>
                <li>Session management</li>
                <li>Security and authentication</li>
                <li>Load balancing</li>
              </ul>

              <h3>Performance Cookies</h3>
              <p>
                These cookies collect information about how visitors use our website, helping us improve 
                its performance and user experience.
              </p>
              <ul>
                <li>Page load times</li>
                <li>Error messages</li>
                <li>Popular pages and features</li>
              </ul>

              <h3>Functional Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make and provide enhanced features.
              </p>
              <ul>
                <li>Language preferences</li>
                <li>Region selection</li>
                <li>User interface customization</li>
              </ul>

              <h3>Targeting/Advertising Cookies</h3>
              <p>
                These cookies are used to deliver relevant advertisements and track campaign effectiveness.
              </p>
              <ul>
                <li>Personalized advertising</li>
                <li>Ad performance tracking</li>
                <li>Retargeting campaigns</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. Cookie Duration</h2>
              
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Cookie Type</th>
                    <th>Duration</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Session Cookies</td>
                    <td>Until browser closes</td>
                    <td>Maintain session state</td>
                  </tr>
                  <tr>
                    <td>Persistent Cookies</td>
                    <td>Up to 2 years</td>
                    <td>Remember preferences</td>
                  </tr>
                  <tr>
                    <td>Analytics Cookies</td>
                    <td>Up to 2 years</td>
                    <td>Track usage patterns</td>
                  </tr>
                  <tr>
                    <td>Advertising Cookies</td>
                    <td>Up to 1 year</td>
                    <td>Deliver targeted ads</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="legal-section">
              <h2>4. Third-Party Cookies</h2>
              <p>We use services from third-party providers that may set cookies on your device:</p>
              
              <h3>Google Analytics</h3>
              <p>
                We use Google Analytics to analyze website traffic and user behavior. Google Analytics 
                uses cookies to collect anonymous information.
              </p>

              <h3>Social Media Platforms</h3>
              <p>
                Social media buttons and widgets may set cookies to track your interactions and enable 
                content sharing.
              </p>

              <h3>Payment Processors</h3>
              <p>
                Our payment partners may use cookies to process transactions securely and prevent fraud.
              </p>
            </div>

            <div className="legal-section">
              <h2>5. Managing Cookies</h2>
              
              <h3>Browser Settings</h3>
              <p>
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul>
                <li>View and delete cookies</li>
                <li>Block all cookies</li>
                <li>Block third-party cookies</li>
                <li>Clear cookies when closing the browser</li>
              </ul>

              <h3>Opt-Out Tools</h3>
              <p>You can opt out of certain cookies using these tools:</p>
              <ul>
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                <li><strong>Network Advertising:</strong> <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">NAI Opt-out</a></li>
                <li><strong>Digital Advertising:</strong> <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">DAA Opt-out</a></li>
              </ul>

              <div className="legal-highlight">
                <p>
                  <strong>Note:</strong> Disabling cookies may affect the functionality of our website 
                  and limit your ability to use certain features.
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>6. Do Not Track Signals</h2>
              <p>
                Some browsers include a "Do Not Track" (DNT) feature. Currently, there is no industry 
                standard for responding to DNT signals. We do not currently respond to DNT signals.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Mobile Devices</h2>
              <p>
                Mobile devices may use advertising identifiers instead of cookies. You can manage these 
                through your device settings:
              </p>
              <ul>
                <li><strong>iOS:</strong> Settings → Privacy → Advertising → Limit Ad Tracking</li>
                <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>8. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology or 
                legal requirements. Please review this page periodically for updates.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Your Consent</h2>
              <p>
                By continuing to use our website, you consent to our use of cookies as described in this 
                policy. You can withdraw your consent at any time by adjusting your browser settings or 
                contacting us.
              </p>
            </div>

            <div className="legal-contact">
              <h3>Contact Us</h3>
              <p>If you have questions about our Cookie Policy:</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@gocourier.com">privacy@gocourier.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+18005550123">+1 (800) 555-0123</a></p>
              <p><strong>Address:</strong> 1250 Broadway Avenue, New York, NY 10001, USA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
