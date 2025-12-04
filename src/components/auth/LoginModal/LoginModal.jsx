import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus email input when modal opens
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);

      // Handle escape key
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      // Handle click outside
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onLogin({ email, password });
      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-popup modal fade show" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="modal-dialog modal-md">
        <button 
          onClick={onClose}
          className="close close-btn"
          aria-label="Close"
        >
          x
        </button>

        <div className="modal-content" ref={modalRef}>
          <div className="login-wrap text-center">
            <h2 className="title-3" id="login-title">sign in</h2>
            <p>Sign in to <strong>GO</strong> for getting all details</p>

            <div className="login-form clrbg-before">
              <form className="login" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    ref={emailInputRef}
                    type="email"
                    placeholder="Email address"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`form-control ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group">
                  <button className="btn-1" type="submit">
                    Sign in now
                  </button>
                </div>
              </form>
              <a href="#" className="gray-clr">Forgot Password?</a>
            </div>
          </div>
          <div className="create-accnt">
            <a href="#" className="white-clr">Don't have an account?</a>
            <h2 className="title-2">
              <a href="#" className="green-clr under-line">Create a free account</a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default LoginModal;
