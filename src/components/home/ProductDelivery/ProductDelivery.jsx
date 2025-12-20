import PropTypes from 'prop-types';
import './ProductDelivery.css';

const ProductDelivery = ({ 
  title = "Why use this Australia Post tracking service?",
  description = "Instead of searching around the web, you can use this simple tool to jump straight to the official Australia Post tracking page. No extra forms, no confusion  just enter your tracking ID and go directly to your shipment details."
}) => {
  return (
    <section className="prod-delivery pad-120">
      <div className="theme-container container">
        <div className="delivery-content-wrapper">
          <div className=" rel-div">
            <div className="pb-50 hidden-xs"></div>
            <h2 className="section-title">
              Simple, <span className="theme-clr">trusted</span> tracking assistance
            </h2>
            <p className="fs-16 delivery-description">
              {description}
            </p>
            <div className="delivery-features">
              <ul className="features-list">
                <li>Direct link to official Australia Post tracking</li>
                <li>No account or login required</li>
                <li>Clear messaging that we are not an official AusPost site</li>
                <li>Designed for quick, hassle-free tracking checks</li>
              </ul>
            </div>
            <div className=" hidden-xs"></div>
          </div>
          <div className="delivery-img ">
            <img
              alt="Fast Delivery"
              src="/Courier4.jpg"
              className="delivery-truck-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

ProductDelivery.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default ProductDelivery;
