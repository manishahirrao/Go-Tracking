import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './FAQHome.css';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-home-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-home-question" onClick={onToggle}>
        <span>{question}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="faq-home-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQHome = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Is this an official Australia Post website?',
      answer:
        'No. This is an independent online tracking service that sends you to the official Australia Post tracking page. We are not affiliated with, endorsed by, or operated by Australia Post.',
    },
    {
      question: 'How does this online tracking service work?',
      answer:
        "You enter your Australia Post tracking number on our site. We validate the format and then open the official Australia Post tracking page in a new tab so you can see your shipment details there.",
    },
    {
      question: 'Do you store my tracking number or personal data?',
      answer:
        'We only use your tracking number to construct the correct link to the Australia Post tracking page. We do not use it to create shipments or manage deliveries.',
    },
    {
      question: 'Can I create or change a shipment here?',
      answer:
        'No. We only help you view existing tracking information. For creating shipments, changing delivery options, or raising issues, you must use Australia Post\'s official channels.',
    },
    {
      question: 'Which couriers do you support?',
      answer:
        'Right now, this tool is focused on helping you track Australia Post consignments. Future versions may support more couriers, but we will always send you to the official tracking source.',
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-home-section">
      <div className="container">
        <div className="faq-home-header">
          <h2 className="faq-home-title">Frequently Asked Questions</h2>
          <p className="faq-home-subtitle">
            Learn how this independent Australia Post tracking service works and what you can (and can't) do here.
          </p>
        </div>
        
        <div className="faq-home-list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
        
        <div className="faq-home-cta">
          <p>
            Ready to track your Australia Post package?
          </p>
          <Link to="/tracking" state={{ scrollToForm: true }} className="faq-home-button">
            Start Tracking Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQHome;
