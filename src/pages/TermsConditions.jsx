import PageHeader from '../components/common/PageHeader/PageHeader';
import './LegalPage.css';

const TermsConditions = () => {
  return (
    <div className="legal-page">
      <PageHeader 
        title="Terms & Conditions"
        subtitle="Terms of service for using GO Courier"
      />

      <section className="legal-content">
        <div className="theme-container container">
          <div className="legal-container">
            <div className="legal-intro">
              <p className="last-updated">Last Updated: December 5, 2024</p>
              <p>
                These Terms and Conditions ("Terms") govern your use of GO Courier's services. By using our 
                services, you agree to be bound by these Terms. Please read them carefully.
              </p>
            </div>

            <div className="legal-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using GO Courier's services, you agree to comply with and be bound by these 
                Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Services Description</h2>
              <p>GO Courier provides courier and delivery services including:</p>
              <ul>
                <li>Domestic and international shipping</li>
                <li>Express and same-day delivery</li>
                <li>Package tracking and notifications</li>
                <li>Freight and cargo services</li>
                <li>Customs clearance assistance</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>3. User Responsibilities</h2>
              
              <h3>Account Registration</h3>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>

              <h3>Package Requirements</h3>
              <ul>
                <li>Properly package items to prevent damage</li>
                <li>Accurately declare package contents and value</li>
                <li>Comply with size and weight restrictions</li>
                <li>Do not ship prohibited or restricted items</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Prohibited Items</h2>
              <p>The following items are prohibited from shipment:</p>
              <ul>
                <li>Illegal substances and contraband</li>
                <li>Explosives, firearms, and ammunition</li>
                <li>Hazardous materials and chemicals</li>
                <li>Perishable goods (without special arrangements)</li>
                <li>Live animals</li>
                <li>Currency and negotiable instruments</li>
                <li>Items that violate intellectual property rights</li>
              </ul>
              <div className="legal-highlight">
                <p>
                  <strong>Shipping prohibited items may result in account termination and legal action.</strong>
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>5. Pricing and Payment</h2>
              
              <h3>Rates</h3>
              <p>
                Shipping rates are based on weight, dimensions, origin, destination, and service type. 
                Rates are subject to change without notice.
              </p>

              <h3>Payment Terms</h3>
              <ul>
                <li>Payment is due at the time of shipment</li>
                <li>We accept major credit cards, PayPal, and bank transfers</li>
                <li>Corporate accounts may be eligible for net payment terms</li>
                <li>Additional fees may apply for special services</li>
              </ul>

              <h3>Taxes and Duties</h3>
              <p>
                Customers are responsible for all applicable taxes, duties, and customs fees for 
                international shipments unless otherwise arranged.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Delivery Terms</h2>
              
              <h3>Delivery Times</h3>
              <p>
                Estimated delivery times are not guaranteed and may vary due to factors beyond our control, 
                including weather, customs delays, and force majeure events.
              </p>

              <h3>Delivery Attempts</h3>
              <ul>
                <li>We make up to 3 delivery attempts</li>
                <li>Signature may be required for certain packages</li>
                <li>Packages may be left at the recipient's discretion</li>
                <li>Undeliverable packages will be returned to sender</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>7. Liability and Insurance</h2>
              
              <h3>Standard Liability</h3>
              <p>
                Our liability for loss or damage is limited to $100 per package unless additional 
                insurance is purchased.
              </p>

              <h3>Insurance Coverage</h3>
              <ul>
                <li>Additional insurance available for declared value</li>
                <li>Claims must be filed within 30 days of delivery</li>
                <li>Proof of value required for claims</li>
                <li>Certain items may have coverage limitations</li>
              </ul>

              <h3>Exclusions</h3>
              <p>We are not liable for:</p>
              <ul>
                <li>Damage due to improper packaging</li>
                <li>Delays caused by force majeure events</li>
                <li>Indirect or consequential damages</li>
                <li>Loss of prohibited or undeclared items</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>8. Claims and Disputes</h2>
              
              <h3>Filing Claims</h3>
              <ul>
                <li>Claims must be filed within 30 days of delivery or expected delivery date</li>
                <li>Provide tracking number and proof of value</li>
                <li>Original packaging must be retained for inspection</li>
                <li>Claims are processed within 30 business days</li>
              </ul>

              <h3>Dispute Resolution</h3>
              <p>
                Any disputes arising from these Terms will be resolved through binding arbitration in 
                accordance with the rules of the American Arbitration Association.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Intellectual Property</h2>
              <p>
                All content on our website, including logos, trademarks, and text, is the property of 
                GO Courier and protected by intellectual property laws. Unauthorized use is prohibited.
              </p>
            </div>

            <div className="legal-section">
              <h2>10. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account and access to our services at 
                any time, without notice, for conduct that violates these Terms or is harmful to other 
                users or our business.
              </p>
            </div>

            <div className="legal-section">
              <h2>11. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. Continued use of our services after changes 
                constitutes acceptance of the modified Terms.
              </p>
            </div>

            <div className="legal-section">
              <h2>12. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of New York, without regard to its 
                conflict of law provisions.
              </p>
            </div>

            <div className="legal-contact">
              <h3>Contact Us</h3>
              <p>For questions about these Terms and Conditions:</p>
              <p><strong>Email:</strong> <a href="mailto:legal@gocourier.com">legal@gocourier.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+18005550123">+1 (800) 555-0123</a></p>
              <p><strong>Address:</strong> 1250 Broadway Avenue, New York, NY 10001, USA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
