import { useState } from 'react';
import PageHeader from '../components/common/PageHeader/PageHeader';
import CostCalculator from '../components/calculator/CostCalculator/CostCalculator';
import QuoteRequestForm from '../components/quote/QuoteRequestForm/QuoteRequestForm';
import './Quote.css';

const Quote = () => {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="quote-page">
      <PageHeader 
        title="Get Your Instant Quote"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Get a Quote', path: '/quote' }
        ]}
      />
      
      <section className="quote-section">
        <div className="theme-container container">
          <div className="quote-content-wrapper">
            <div className="quote-header">
              <h2 className="section-title">Get Shipping Quote</h2>
              <p className="section-description">
                Calculate instant shipping costs or request a detailed quote for your shipment.
                Our transparent pricing ensures you know exactly what you'll pay.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`px-8 py-3 font-semibold transition-colors ${
                    activeTab === 'calculator'
                      ? 'bg-primary text-white'
                      : 'bg-white text-black hover:bg-light-gray'
                  }`}
                >
                  Instant Calculator
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className={`px-8 py-3 font-semibold transition-colors ${
                    activeTab === 'request'
                      ? 'bg-primary text-white'
                      : 'bg-white text-black hover:bg-light-gray'
                  }`}
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="quote-form-container">
              {activeTab === 'calculator' ? (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Instant Cost Calculator</h3>
                    <p className="text-gray">Get immediate pricing based on your package details</p>
                  </div>
                  <CostCalculator />
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Request Detailed Quote</h3>
                    <p className="text-gray">Submit your requirements and we'll provide a personalized quote</p>
                  </div>
                  <QuoteRequestForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
