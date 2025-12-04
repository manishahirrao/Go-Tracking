import { FaShippingFast, FaShieldAlt, FaGlobeAmericas } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaShippingFast className="text-5xl text-primary" />,
      title: "Fast Delivery",
      description: "Express shipping options to get your packages delivered quickly and efficiently."
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-5xl text-primary" />,
      title: "Secured Service",
      description: "Your packages are protected with our comprehensive insurance and tracking system."
    },
    {
      id: 3,
      icon: <FaGlobeAmericas className="text-5xl text-primary" />,
      title: "Worldwide Shipping",
      description: "We deliver to over 200 countries and territories around the globe."
    }
  ];

  return (
    <section className="py-lg bg-bg-light relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <span className="text-[200px] font-secondary font-black uppercase text-black">
          About
        </span>
      </div>

      <div className="container mx-auto max-w-container px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="bg-white p-8 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-secondary font-bold uppercase mb-3 text-black">
                {service.title}
              </h3>
              <p className="text-light-gray">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
