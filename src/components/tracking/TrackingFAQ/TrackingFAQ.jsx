import { useState } from 'react';
import './TrackingFAQ.css';

const TrackingFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does this online tracking service work?",
      answer: "This service takes your Australia Post tracking number and creates a direct link to the official Australia Post tracking page. We don't store your tracking numbers or provide tracking ourselves - we simply help you get to the right place quickly."
    },
    {
      question: "What tracking numbers are supported?",
      answer: "We support all Australia Post tracking formats including letters, numbers, and dashes. Typical formats include ABC1234567890, 1234567890, and TRACK-123-ABCDEF. Most Australia Post tracking numbers are 10-15 characters long."
    },
    {
      question: "Is this service free to use?",
      answer: "Yes! This online tracking service is completely free. We don't charge anything to help you access your Australia Post tracking information."
    },
    {
      question: "Do you store my tracking numbers?",
      answer: "No, we don't store any tracking numbers. Your tracking information is sent directly to Australia Post's official tracking system. We only help you get there faster."
    },
    {
      question: "What if my tracking number doesn't work?",
      answer: "If your tracking number doesn't work, first double-check that you've entered it correctly. Make sure it matches the format on your shipping confirmation. If it still doesn't work, you may need to contact Australia Post directly."
    },
    {
      question: "How long does tracking information take to update?",
      answer: "Tracking information is updated by Australia Post, not by us. Updates typically appear within a few hours of scanning, but sometimes can take 24-48 hours depending on the shipping stage."
    },
    {
      question: "Can I track international packages?",
      answer: "Yes, if your international package is being handled by Australia Post, you can use this online service to track it. The tracking will show updates once Australia Post receives and scans the package."
    },
    {
      question: "Is this affiliated with Australia Post?",
      answer: "No, we are an independent online service, not affiliated with or endorsed by Australia Post. We simply provide a convenient way to access their official tracking system."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="tracking-faq-section">
      <div className="tracking-faq-container">
        <div className="tracking-faq-header">
          <h2 className="tracking-faq-title">Frequently Asked Questions</h2>
          <p className="tracking-faq-subtitle">
            Common questions about using our Australia Post tracking service
          </p>
        </div>

        <div className="tracking-faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`tracking-faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="tracking-faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="faq-question-text">{faq.question}</span>
                <span className="faq-toggle-icon">
                  <svg 
                    className={`faq-icon ${activeIndex === index ? 'open' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`tracking-faq-answer ${activeIndex === index ? 'show' : ''}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="tracking-faq-footer">
          <div className="faq-cta-content">
            <h3 className="cta-title">Ready to Track Another Package?</h3>
            <p className="cta-subtitle">Enter a new tracking number to get instant access to Australia Post tracking</p>
            <button 
              className="faq-cta-button"
              onClick={() => {
                const trackingInput = document.getElementById('tracking-number');
                if (trackingInput) {
                  trackingInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  trackingInput.focus();
                }
              }}
            >
              <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Track Another Package
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingFAQ;
