import PageHeader from '../components/common/PageHeader/PageHeader';
import './LegalPage.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <PageHeader 
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />

      <section className="legal-content">
        <div className="theme-container container">
          <div className="legal-container">
            <div className="legal-intro">
              <p className="last-updated">Last Updated: December 5, 2024</p>
              <p>
                At GO Courier, we are committed to protecting your privacy and ensuring the security of your 
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our services.
              </p>
            </div>

            <div className="legal-section">
              <h2>1. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <p>We collect information that you provide directly to us, including:</p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Account credentials and preferences</li>
                <li>Communication history with our customer service</li>
              </ul>

              <h3>Shipment Information</h3>
              <ul>
                <li>Package details (weight, dimensions, contents)</li>
                <li>Sender and recipient information</li>
                <li>Tracking and delivery information</li>
                <li>Delivery signatures and photos</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>2. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li><strong>Service Delivery:</strong> Process and deliver your shipments</li>
                <li><strong>Communication:</strong> Send order confirmations, tracking updates, and customer support</li>
                <li><strong>Payment Processing:</strong> Process transactions and prevent fraud</li>
                <li><strong>Improvement:</strong> Analyze usage patterns to improve our services</li>
                <li><strong>Marketing:</strong> Send promotional offers (with your consent)</li>
                <li><strong>Legal Compliance:</strong> Comply with legal obligations and resolve disputes</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. Information Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              
              <h3>Service Providers</h3>
              <p>
                Third-party companies that help us operate our business, including payment processors, 
                delivery partners, and technology providers.
              </p>

              <h3>Legal Requirements</h3>
              <p>
                When required by law, court order, or government request, or to protect our rights and safety.
              </p>

              <h3>Business Transfers</h3>
              <p>
                In connection with a merger, acquisition, or sale of assets, your information may be transferred.
              </p>

              <div className="legal-highlight">
                <p>
                  <strong>We do not sell your personal information to third parties for marketing purposes.</strong>
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Secure servers with firewall protection</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure payment processing through PCI-compliant providers</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>5. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Object:</strong> Object to certain processing of your information</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience. You can control cookies 
                through your browser settings. See our Cookie Policy for more details.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal 
                information from children. If you believe we have collected information from a child, 
                please contact us immediately.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information in accordance 
                with this Privacy Policy.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant 
                changes by posting the new policy on our website and updating the "Last Updated" date.
              </p>
            </div>

            <div className="legal-contact">
              <h3>Contact Us</h3>
              <p>If you have questions about this Privacy Policy, please contact us:</p>
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

export default PrivacyPolicy;
