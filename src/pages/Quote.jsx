import PageHeader from '../components/common/PageHeader/PageHeader';
import CostCalculator from '../components/calculator/CostCalculator/CostCalculator';
import './Quote.css';

const Quote = () => {
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
              <h2 className="section-title">Calculate Shipping Cost</h2>
              <p className="section-description">
                Request a shipping quote by entering your package details and destination. 
                Our transparent pricing ensures you know exactly what you'll pay before you ship.
              </p>
            </div>
            <div className="quote-form-container">
              <CostCalculator />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;
