import { FaBox, FaCalculator, FaTruck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';

const Features = () => {
  return (
    <section className="py-xl bg-white">
      <div className="container mx-auto max-w-container px-4">
        {/* Track Product Feature */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-lg border-t-4 border-primary">
            <div className="text-center mb-6">
              <FaBox className="text-5xl text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-secondary font-black uppercase mb-2">
                Track Your Product
              </h2>
              <p className="text-light-gray">
                Now you can track your product easily
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter your product ID"
                className="flex-1 px-4 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
              <Link to="/tracking">
                <Button variant="primary" size="md" className="w-full md:w-auto">
                  Track Your Product
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Calculate Cost Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none hidden lg:block">
                <span className="text-[150px] font-secondary font-black uppercase text-primary">
                  Calculate
                </span>
              </div>
              <img 
                src="https://via.placeholder.com/500x400/f5ab35/ffffff?text=Courier+Service" 
                alt="Courier delivery person"
                className="w-full rounded-sm shadow-lg relative z-10"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <FaCalculator className="text-5xl text-primary mb-4" />
            <h2 className="text-3xl font-secondary font-black uppercase mb-4">
              Calculate Your Cost
            </h2>
            <p className="text-light-gray mb-6">
              Get an instant quote for your shipping needs. Enter your package details and destination to calculate the cost.
            </p>
            <Link to="/services">
              <Button variant="outline" size="md">
                Get Quote Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Delivery Steps */}
        <div className="bg-black text-white py-lg px-8 rounded-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 hidden lg:block">
            <FaTruck className="text-[300px] text-primary" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-secondary font-black uppercase text-center mb-12">
              How It <span className="text-primary">Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-6xl font-secondary font-black text-primary mb-4">1.</div>
                <h3 className="text-xl font-secondary font-bold uppercase mb-2">Order</h3>
                <p className="text-gray">
                  Place your order online or visit our location
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-secondary font-black text-primary mb-4">2.</div>
                <h3 className="text-xl font-secondary font-bold uppercase mb-2">Wait</h3>
                <p className="text-gray">
                  We pick up and process your package
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-secondary font-black text-primary mb-4">3.</div>
                <h3 className="text-xl font-secondary font-bold uppercase mb-2">Deliver</h3>
                <p className="text-gray">
                  Your package arrives safely at its destination
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
