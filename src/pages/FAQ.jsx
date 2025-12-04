import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader/PageHeader';
import './FAQ.css';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button className="faq-question" onClick={onToggle}>
        <span>{question}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'FAQ' }
  ];

  const faqs = [
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What areas do you deliver to?',
          answer: 'We provide delivery services to over 200 countries worldwide. For domestic shipping, we cover all 50 states in the US. International shipping is available to most countries with customs clearance support.'
        },
        {
          question: 'How can I track my package?',
          answer: 'You can track your package using the tracking number provided in your confirmation email. Simply enter the tracking number on our tracking page or homepage, and you\'ll see real-time updates on your package location and delivery status.'
        },
        {
          question: 'What are your business hours?',
          answer: 'Our customer support is available 24/7 to assist you. Our physical locations are open Monday-Friday 7am-9pm EST, and Saturday-Sunday 8am-6pm EST. You can place orders online anytime.'
        },
        {
          question: 'Do you offer insurance for packages?',
          answer: 'Yes, all packages include basic insurance coverage up to $100. Additional insurance can be purchased for high-value items. Express and international shipments include enhanced insurance coverage.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery times vary by service: Standard (3-5 business days), Express (1-2 business days), Same-Day (within 24 hours for select cities), and International (5-10 business days). Exact delivery times depend on origin and destination.'
        },
        {
          question: 'Can I schedule a pickup?',
          answer: 'Yes, you can schedule a pickup online or by calling our customer service. Pickups are available Monday-Saturday. Same-day pickup is available for orders placed before 2pm local time.'
        },
        {
          question: 'What if I miss my delivery?',
          answer: 'If you miss a delivery, our driver will leave a notice with instructions. You can reschedule delivery online, arrange for pickup at a nearby location, or authorize delivery without signature (for eligible packages).'
        },
        {
          question: 'Do you deliver on weekends?',
          answer: 'Yes, we offer weekend delivery for Express and Premium services. Standard delivery operates Monday-Friday, with Saturday delivery available for an additional fee.'
        }
      ]
    },
    {
      category: 'Pricing & Payment',
      questions: [
        {
          question: 'How is shipping cost calculated?',
          answer: 'Shipping costs are based on package weight, dimensions, origin, destination, and delivery speed. You can use our cost calculator on the homepage to get an instant quote before shipping.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and corporate accounts. Payment is processed securely through SSL encryption.'
        },
        {
          question: 'Are there any hidden fees?',
          answer: 'No, we believe in transparent pricing. The quote you receive includes all standard fees. Additional charges may apply for special services like insurance upgrades, signature requirements, or customs duties for international shipments.'
        },
        {
          question: 'Do you offer discounts for bulk shipping?',
          answer: 'Yes, we offer volume discounts for businesses and frequent shippers. Contact our sales team for custom pricing based on your shipping volume and needs.'
        }
      ]
    },
    {
      category: 'Package Requirements',
      questions: [
        {
          question: 'What are the size and weight limits?',
          answer: 'Standard packages: up to 50 lbs and 108 inches (length + girth). Oversized packages: up to 150 lbs. For freight services, we handle packages over 150 lbs with no upper limit. Contact us for specific requirements.'
        },
        {
          question: 'How should I package my items?',
          answer: 'Use sturdy boxes with adequate cushioning. Fragile items should be wrapped individually. We provide free packaging materials at our locations. For valuable items, consider our professional packaging service.'
        },
        {
          question: 'What items cannot be shipped?',
          answer: 'Prohibited items include hazardous materials, explosives, illegal substances, perishable foods (without special arrangements), and live animals. See our full prohibited items list on our website.'
        },
        {
          question: 'Can I ship internationally?',
          answer: 'Yes, we ship to over 200 countries. International shipments require customs documentation. We provide assistance with customs forms and can handle duties and taxes on your behalf.'
        }
      ]
    }
  ];

  const handleToggle = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <PageHeader 
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services"
      />

      <section className="faq-content pad-80">
        <div className="theme-container container">
          <div className="faq-intro">
            <h2 className="section-title">How Can We Help You?</h2>
            <p className="section-subtitle">
              Browse through our frequently asked questions. If you can't find what you're looking for, 
              feel free to contact our support team.
            </p>
          </div>

          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h3 className="category-title">{category.category}</h3>
              <div className="faq-list">
                {category.questions.map((faq, questionIndex) => (
                  <FAQItem
                    key={questionIndex}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === `${categoryIndex}-${questionIndex}`}
                    onToggle={() => handleToggle(categoryIndex, questionIndex)}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="faq-contact">
            <h3>Still Have Questions?</h3>
            <p>Our customer support team is here to help you 24/7</p>
            <div className="contact-options">
              <a href="/contact" className="btn-1">Contact Support</a>
              <a href="tel:+18005550123" className="btn-outline">Call: +1 (800) 555-0123</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
