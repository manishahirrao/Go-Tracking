import PropTypes from 'prop-types';
import './ProductDelivery.css';

const ProductDelivery = ({ 
  title = "Get the fastest product delivery",
  description = "Experience lightning-fast delivery with our advanced logistics network. We leverage cutting-edge technology and strategic partnerships to ensure your packages reach their destination in record time. With real-time tracking, multiple delivery speed options, and a 99.8% on-time delivery rate, we're committed to exceeding your expectations every single time."
}) => {
  return (
    <section className="prod-delivery pad-120">
      <div className="theme-container container">
        <div className="delivery-content-wrapper">
          <div className=" rel-div">
            <div className="pb-50 hidden-xs"></div>
            <h2 className="section-title">
              Get the <span className="theme-clr">fastest</span> product delivery
            </h2>
            <p className="fs-16 delivery-description">
              {description}
            </p>
            <div className="delivery-features">
              <ul className="features-list">
                <li>✓ Same-day delivery available in major cities</li>
                <li>✓ 99.8% on-time delivery rate</li>
                <li>✓ Real-time GPS tracking</li>
                <li>✓ Secure handling and insurance included</li>
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
