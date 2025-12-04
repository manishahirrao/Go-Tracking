import { PRICING_TIERS } from '../utils/constants';
import PricingCard from '../components/pricing/PricingCard/PricingCard';
import './Pricing.css';

const Pricing = () => {
  const handleSelectPlan = (tierId) => {
    console.log('Selected plan:', tierId);
    // In a real application, this would navigate to checkout or signup
  };

  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <div className="container">
          <h1>Pricing Plans</h1>
          <p>Choose the perfect plan for your shipping needs</p>
        </div>
      </div>

      <div className="pricing-content">
        <div className="container">
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} onSelect={handleSelectPlan} />
            ))}
          </div>

          <div className="pricing-comparison">
            <h2>Compare Plans</h2>
            <p className="comparison-subtitle">
              All plans include basic tracking, secure packaging, and email notifications
            </p>
            <div className="comparison-note">
              <p>
                <strong>Need a custom solution?</strong> Contact our sales team for enterprise
                pricing and custom integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
