import { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './SearchOverlay.css';

const SearchOverlay = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus input when overlay opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-popup" role="dialog" aria-modal="true" aria-label="Search">
      <div className="search-popup-inner">
        <div className="popup-box-inner">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="search-query"
              placeholder="Search and hit enter"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search query"
            />
          </form>
        </div>
      </div>
      <button
        onClick={onClose}
        className="close-search"
        aria-label="Close search"
      >
        <FaTimes />
      </button>
    </div>
  );
};

SearchOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default SearchOverlay;
