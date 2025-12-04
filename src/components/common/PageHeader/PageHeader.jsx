import PropTypes from 'prop-types';
import './PageHeader.css';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="page-header">
      <div className="theme-container container">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default PageHeader;
