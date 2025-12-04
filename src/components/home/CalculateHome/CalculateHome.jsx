import CostCalculator from '../../calculator/CostCalculator/CostCalculator';
import BackgroundText from '../../common/BackgroundText/BackgroundText';
import './CalculateHome.css';

const CalculateHome = () => {
  return (
    <section className="calculate-home-section calculate pt-100">
      <div className="theme-container container">
        <BackgroundText text="calculate" position="right" />
        <div className="calculate-home-grid">
          <div className="calculate-home-image">
            <img
              src="/Courier3.jpg"
              alt="Courier Service"
              className="courier-man-img"
            />
          </div>
          <div className="calculate-home-content">
            <div className="pad-10"></div>
            <h2 className="section-title pb-10">calculate your cost</h2>
            <p className="fs-16">
              Get an instant shipping quote by entering your package dimensions and destination. 
              Our transparent pricing ensures you know exactly what you'll pay before you ship.
            </p>
            <div className="calculate-form-wrapper">
              <CostCalculator />
            </div>
            <div className="pt-80 hidden-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculateHome;
