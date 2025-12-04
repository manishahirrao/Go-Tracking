import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb';
import './LegalPage.css';

const RefundPolicy = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Refund Policy' }
  ];

  return (
    <div className="legal-page">
      <Breadcrumb 
        items={breadcrumbItems}
        title="Refund Policy"
        subtitle="Our policy for refunds and cancellations"
      />

      <section className="legal-content">
        <div className="theme-container container">
          <div className="legal-container">
            <div className="legal-intro">
              <p className="last-updated">Last Updated: December 5, 2024</p>
              <p>
                At GO Courier, we strive to provide excellent service. This Refund Policy outlines the 
                conditions under which refunds may be issued for our courier and delivery services.
              </p>
            </div>

            <div className="legal-section">
              <h2>1. Refund Eligibility</h2>
              <p>Refunds may be issued in the following circumstances:</p>
              <ul>
                <li>Service not provided as promised</li>
                <li>Significant delivery delays caused by our error</li>
                <li>Package lost or damaged due to our negligence</li>
                <li>Duplicate charges or billing errors</li>
                <li>Service cancellation before pickup</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>2. Cancellation Policy</h2>
              
              <h3>Before Pickup</h3>
              <p>
                You may cancel your shipment before pickup for a full refund. Cancellations must be 
                made at least 2 hours before the scheduled pickup time.
              </p>
              <ul>
                <li>Online cancellations: Instant refund processing</li>
                <li>Phone cancellations: Refund within 3-5 business days</li>
                <li>No cancellation fees for standard services</li>
              </ul>

              <h3>After Pickup</h3>
              <p>
                Once a package has been picked up, cancellations are subject to the following conditions:
              </p>
              <ul>
                <li>Partial refund may be available if package hasn't left origin facility</li>
                <li>No refund if package is in transit</li>
                <li>Return shipping fees apply if package needs to be returned</li>
              </ul>

              <div className="legal-highlight">
                <p>
                  <strong>Express and Same-Day Services:</strong> These services are non-refundable 
                  once pickup has occurred due to priority processing.
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>3. Refund Amounts</h2>
              
              <table className="legal-table">
                <thead>
                  <tr>
                    <th>Situation</th>
                    <th>Refund Amount</th>
                    <th>Processing Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cancellation before pickup</td>
                    <td>100% refund</td>
                    <td>3-5 business days</td>
                  </tr>
                  <tr>
                    <td>Service not provided</td>
                    <td>100% refund</td>
                    <td>5-7 business days</td>
                  </tr>
                  <tr>
                    <td>Significant delay (our fault)</td>
                    <td>50-100% refund</td>
                    <td>7-10 business days</td>
                  </tr>
                  <tr>
                    <td>Package lost</td>
                    <td>Shipping cost + insurance claim</td>
                    <td>10-15 business days</td>
                  </tr>
                  <tr>
                    <td>Billing error</td>
                    <td>Overcharged amount</td>
                    <td>3-5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="legal-section">
              <h2>4. Non-Refundable Situations</h2>
              <p>Refunds will not be issued in the following cases:</p>
              <ul>
                <li>Delays caused by weather, natural disasters, or force majeure events</li>
                <li>Incorrect address provided by customer</li>
                <li>Recipient unavailable for delivery (after 3 attempts)</li>
                <li>Customs delays for international shipments</li>
                <li>Package refused by recipient</li>
                <li>Damage due to improper packaging by customer</li>
                <li>Prohibited items discovered during transit</li>
                <li>Customer changed mind after pickup</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>5. How to Request a Refund</h2>
              
              <h3>Step 1: Contact Us</h3>
              <p>Submit a refund request through one of these channels:</p>
              <ul>
                <li>Online: Use our refund request form on the website</li>
                <li>Email: refunds@gocourier.com</li>
                <li>Phone: +1 (800) 555-0123</li>
                <li>In-person: Visit any GO Courier location</li>
              </ul>

              <h3>Step 2: Provide Information</h3>
              <p>Include the following in your refund request:</p>
              <ul>
                <li>Tracking number</li>
                <li>Order confirmation number</li>
                <li>Reason for refund request</li>
                <li>Supporting documentation (if applicable)</li>
                <li>Preferred refund method</li>
              </ul>

              <h3>Step 3: Review Process</h3>
              <p>
                Our team will review your request within 2-3 business days. You will receive an email 
                notification with the decision and next steps.
              </p>

              <h3>Step 4: Refund Processing</h3>
              <p>
                Approved refunds are processed within the timeframes specified above. Refunds are issued 
                to the original payment method.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Refund Methods</h2>
              
              <h3>Credit Card Refunds</h3>
              <p>
                Refunds to credit cards typically appear within 5-10 business days, depending on your 
                card issuer's processing time.
              </p>

              <h3>PayPal Refunds</h3>
              <p>
                PayPal refunds are processed immediately and should appear in your account within 24 hours.
              </p>

              <h3>Bank Transfer Refunds</h3>
              <p>
                Bank transfer refunds may take 7-10 business days to process and appear in your account.
              </p>

              <h3>Account Credit</h3>
              <p>
                You may opt to receive refunds as account credit, which can be used for future shipments. 
                Account credits are applied immediately and never expire.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Partial Refunds</h2>
              <p>Partial refunds may be issued for:</p>
              <ul>
                <li>Minor service issues that don't warrant a full refund</li>
                <li>Delivery delays of 1-2 days beyond estimated time</li>
                <li>Partial service completion</li>
                <li>Goodwill gestures for service inconveniences</li>
              </ul>
              <p>
                The amount of partial refunds is determined on a case-by-case basis and is at the 
                discretion of GO Courier management.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. Insurance Claims vs. Refunds</h2>
              
              <h3>Shipping Cost Refund</h3>
              <p>
                If your package is lost or damaged, you may be eligible for a refund of the shipping cost.
              </p>

              <h3>Insurance Claim</h3>
              <p>
                For the value of lost or damaged contents, you must file a separate insurance claim. 
                See our Terms & Conditions for insurance claim procedures.
              </p>

              <div className="legal-highlight">
                <p>
                  <strong>Important:</strong> Shipping cost refunds and insurance claims are separate 
                  processes. You may be eligible for both.
                </p>
              </div>
            </div>

            <div className="legal-section">
              <h2>9. Dispute Resolution</h2>
              <p>
                If you disagree with a refund decision, you may request a review by our customer service 
                manager. Escalated reviews are completed within 5-7 business days.
              </p>
              <p>
                For unresolved disputes, you may pursue resolution through the dispute resolution process 
                outlined in our Terms & Conditions.
              </p>
            </div>

            <div className="legal-section">
              <h2>10. Changes to This Policy</h2>
              <p>
                We reserve the right to modify this Refund Policy at any time. Changes will be posted 
                on this page with an updated "Last Updated" date. Continued use of our services after 
                changes constitutes acceptance of the modified policy.
              </p>
            </div>

            <div className="legal-section">
              <h2>11. Contact Information</h2>
              <p>
                For questions about refunds or to request a refund, please contact our customer service team:
              </p>
              <ul>
                <li><strong>Refund Requests:</strong> refunds@gocourier.com</li>
                <li><strong>Customer Service:</strong> support@gocourier.com</li>
                <li><strong>Phone:</strong> +1 (800) 555-0123 (24/7)</li>
                <li><strong>Live Chat:</strong> Available on our website</li>
              </ul>
            </div>

            <div className="legal-contact">
              <h3>Need Help?</h3>
              <p>Our customer service team is available 24/7 to assist you</p>
              <p><strong>Email:</strong> <a href="mailto:refunds@gocourier.com">refunds@gocourier.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+18005550123">+1 (800) 555-0123</a></p>
              <p><strong>Address:</strong> 1250 Broadway Avenue, New York, NY 10001, USA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
