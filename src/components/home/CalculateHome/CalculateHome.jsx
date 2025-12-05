import CostCalculator from '../../calculator/CostCalculator/CostCalculator';
import BackgroundText from '../../common/BackgroundText/BackgroundText';
import './CalculateHome.css';

const CalculateHome = () => {
  return (
    <section id="quote-form" className="calculate-home-section quote-section">
      <div className="theme-container container">
        <div className="quote-content-wrapper">
          <div className="quote-header">
            <h2 className="section-title">Get Your Instant Quote</h2>
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
  );
};

export default CalculateHome;
