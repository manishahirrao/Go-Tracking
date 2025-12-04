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
      <div className="contact-content">
        <div className="theme-container container">
          <div className="contact-form-wrapper">
            <div className="contact-form-header">
              <h2>Contact Us</h2>
              <p>Fill out the form below and we'll get back to you within 4 hours</p>
            </div>
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
