import Button from '../../common/Button/Button';
import './PricingCard.css';

const PricingCard = ({ tier, onSelect }) => {
  const handleSelect = () => {
    if (onSelect) {
      onSelect(tier.id);
    }
  };

  return (
    <div className={`pricing-card ${tier.recommended ? 'recommended' : ''}`}>
      {tier.recommended && <div className="recommended-badge">Most Popular</div>}

      <div className="pricing-card-header">
        <h3 className="tier-name">{tier.name}</h3>
        <div className="tier-price">
          <span className="price-currency">$</span>
          <span className="price-amount">{tier.price.toFixed(2)}</span>
          <span className="price-period">/{tier.period === 'monthly' ? 'month' : 'shipment'}</span>
        </div>
      </div>

      <div className="pricing-card-body">
        <div className="tier-features">
          <h4>Features:</h4>
          <ul>
            {tier.features.map((feature, index) => (
              <li key={index} className="feature-item">
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {tier.limitations && tier.limitations.length > 0 && (
          <div className="tier-limitations">
            <h4>Limitations:</h4>
            <ul>
              {tier.limitations.map((limitation, index) => (
                <li key={index} className="limitation-item">
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pricing-card-footer">
        <Button
          variant={tier.recommended ? 'primary' : 'outline'}
          onClick={handleSelect}
          className="select-btn"
        >
          {tier.ctaText}
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
