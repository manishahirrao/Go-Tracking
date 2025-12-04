import PropTypes from 'prop-types';
import './BackgroundText.css';

const BackgroundText = ({ text, position = 'center' }) => {
  return (
    <div className={`bg-text ${position}`} aria-hidden="true">
      {text}
    </div>
  );
};

BackgroundText.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right'])
};

export default BackgroundText;
