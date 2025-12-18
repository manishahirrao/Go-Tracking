import PropTypes from 'prop-types';
import './Steps.css';

const Steps = ({ steps }) => {
  const defaultSteps = [
    {
      number: 1,
      title: 'Enter Tracking Number',
      description: 'Paste your Australia Post tracking ID into the box on the home or tracking page.',
    },
    {
      number: 2,
      title: 'We Verify & Prepare',
      description: 'We quickly check the format and get your link to the official Australia Post tracking page ready.',
    },
    {
      number: 3,
      title: 'View Official Updates',
      description: 'You are redirected to the Australia Post tracking page to see live, official shipment updates.',
    },
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
