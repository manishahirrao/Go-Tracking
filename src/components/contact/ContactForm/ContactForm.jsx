import { useState } from 'react';
import { validateRequired, validateEmail } from '../../../utils/validators';
import { submitContactForm } from '../../../services/contactService';
import Button from '../../common/Button/Button';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactId, setContactId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear success message when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone is optional, so only validate if provided
    if (formData.phone && formData.phone.trim().length > 0) {
      // Basic phone validation - just check it's not empty if provided
      if (formData.phone.trim().length < 10) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    if (!validateRequired(formData.message)) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitContactForm(formData);
      setIsSuccess(true);
      setContactId(result.contactId);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({
        submit: error.message || 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit} className="contact-form">
        {isSuccess && (
          <div className="success-message">
            <p>Thank you for contacting us! We'll get back to you soon.</p>
            {contactId && (
              <p className="text-sm mt-2">Reference ID: {contactId.substring(0, 8)}</p>
            )}
          </div>
        )}

        {errors.submit && (
          <div className="error-message-box">
            <p>{errors.submit}</p>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
              disabled={isSubmitting}
              inputMode="tel"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="How can we help?"
              disabled={isSubmitting}
            />
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us more about your inquiry..."
            rows="6"
            disabled={isSubmitting}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <Button type="submit" variant="primary" disabled={isSubmitting} className="submit-btn">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
