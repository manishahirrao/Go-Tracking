import PropTypes from 'prop-types';
import './Steps.css';

const Steps = ({ steps }) => {
  const defaultSteps = [
    {
      number: 1,
      title: 'Order',
      description: 'Book your shipment online or call us. Get instant quotes and schedule pickup.'
    },
    {
      number: 2,
      title: 'Wait',
      description: 'We collect your package and process it through our secure logistics network.'
    },
    {
      number: 3,
      title: 'Deliver',
      description: 'Track in real-time as we deliver your package safely to its destination.'
    }
  ];

  const stepsToDisplay = steps || defaultSteps;

  return (
    <section className="steps-wrap mask-overlay pad-80">
      <div className="theme-container container">
        <div className="steps-grid">
          {stepsToDisplay.map((step, index) => (
            <div key={step.number} className="step-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="step-number font-2 fs-50">{step.number}.</div>
              <div className="steps-content">
                <h2 className="title-3">{step.title}</h2>
                <p className="gray-clr">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="step-img">
        <img src="/step-img.png" alt="Delivery Steps" />
      </div>
    </section>
  );
};

Steps.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default Steps;
