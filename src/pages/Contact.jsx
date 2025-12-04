import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ContactForm from '../components/contact/ContactForm/ContactForm';
import './Contact.css';

const Contact = () => {
  const handleFormSubmit = async (formData) => {
    // In a real application, this would send data to an API
    console.log('Form submitted:', formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team - we're here to help</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Get In Touch</h2>
              <p className="contact-intro">
                Have questions about our services? Need a custom quote? Our team is ready to assist
                you with all your shipping needs.
              </p>

              <div className="contact-info-cards">
                <div className="info-card">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                    <p className="info-note">Mon-Fri, 8am-6pm EST</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>support@courier.com</p>
                    <p className="info-note">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-content">
                    <h3>Address</h3>
                    <p>123 Shipping Lane</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <FaClock />
                  </div>
                  <div className="info-content">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 8am - 6pm</p>
                    <p>Saturday: 9am - 2pm</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="response-time-info">
                <h3>Expected Response Times</h3>
                <ul>
                  <li>
                    <strong>Email:</strong> Within 24 hours
                  </li>
                  <li>
                    <strong>Phone:</strong> Immediate during business hours
                  </li>
                  <li>
                    <strong>Contact Form:</strong> Within 24-48 hours
                  </li>
                </ul>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
