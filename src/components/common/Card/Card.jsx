import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  header, 
  footer,
  className = '',
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-sm shadow-sm overflow-hidden';
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {header && (
        <div className="px-6 py-4 border-b border-border">
          {header}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-border bg-bg-light">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
  hover: PropTypes.bool,
};

export default Card;
