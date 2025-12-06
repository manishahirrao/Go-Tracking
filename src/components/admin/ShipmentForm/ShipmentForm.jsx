import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateEmail, validatePhone, validateWeight } from '../../../utils/validators';
import './ShipmentForm.css';

const ShipmentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_address: '',
    sender_phone: '',
    sender_email: '',
    recipient_name: '',
    recipient_address: '',
    recipient_phone: '',
    recipient_email: '',
    weight: '',
    service_level: 'standard',
    cost: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.sender_name.trim()) newErrors.sender_name = 'Sender name is required';
    if (!formData.sender_address.trim()) newErrors.sender_address = 'Sender address is required';
    if (formData.sender_email && !validateEmail(formData.sender_email)) {
      newErrors.sender_email = 'Invalid email address';
    }
    if (formData.sender_phone && !validatePhone(formData.sender_phone)) {
      newErrors.sender_phone = 'Invalid phone number';
    }

    if (!formData.recipient_name.trim()) newErrors.recipient_name = 'Recipient name is required';
    if (!formData.recipient_address.trim()) newErrors.recipient_address = 'Recipient address is required';
    if (formData.recipient_email && !validateEmail(formData.recipient_email)) {
      newErrors.recipient_email = 'Invalid email address';
    }
    if (formData.recipient_phone && !validatePhone(formData.recipient_phone)) {
      newErrors.recipient_phone = 'Invalid phone number';
    }

    if (!formData.weight || !validateWeight(parseFloat(formData.weight))) {
      newErrors.weight = 'Valid weight is required (0.1 - 1000 kg)';
    }

    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Valid cost is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setSubmitting(true);
    
    const shipmentData = {
      ...formData,
      weight: parseFloat(formData.weight),
      cost: parseFloat(formData.cost)
    };

    await onSubmit(shipmentData);
    setSubmitting(false);
  };

  return (
    <form className="shipment-form" onSubmit={handleSubmit}>
      <h2>Create New Shipment</h2>
      
      <div className="form-section">
        <h3>Sender Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="sender_name"
              value={formData.sender_name}
              onChange={handleChange}
              className={errors.sender_name ? 'error' : ''}
            />
            {errors.sender_name && <span className="error-text">{errors.sender_name}</span>}
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="sender_phone"
              value={formData.sender_phone}
              onChange={handleChange}
              className={errors.sender_phone ? 'error' : ''}
            />
            {errors.sender_phone && <span className="error-text">{errors.sender_phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Address *</label>
            <input
              type="text"
              name="sender_address"
              value={formData.sender_address}
              onChange={handleChange}
              className={errors.sender_address ? 'error' : ''}
            />
            {errors.sender_address && <span className="error-text">{errors.sender_address}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="sender_email"
              value={formData.sender_email}
              onChange={handleChange}
              className={errors.sender_email ? 'error' : ''}
            />
            {errors.sender_email && <span className="error-text">{errors.sender_email}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Recipient Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="recipient_name"
              value={formData.recipient_name}
              onChange={handleChange}
              className={errors.recipient_name ? 'error' : ''}
            />
            {errors.recipient_name && <span className="error-text">{errors.recipient_name}</span>}
          </div>
          
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="recipient_phone"
              value={formData.recipient_phone}
              onChange={handleChange}
              className={errors.recipient_phone ? 'error' : ''}
            />
            {errors.recipient_phone && <span className="error-text">{errors.recipient_phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Address *</label>
            <input
              type="text"
              name="recipient_address"
              value={formData.recipient_address}
              onChange={handleChange}
              className={errors.recipient_address ? 'error' : ''}
            />
            {errors.recipient_address && <span className="error-text">{errors.recipient_address}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="recipient_email"
              value={formData.recipient_email}
              onChange={handleChange}
              className={errors.recipient_email ? 'error' : ''}
            />
            {errors.recipient_email && <span className="error-text">{errors.recipient_email}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Shipment Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Weight (kg) *</label>
            <input
              type="number"
              name="weight"
              step="0.1"
              value={formData.weight}
              onChange={handleChange}
              className={errors.weight ? 'error' : ''}
            />
            {errors.weight && <span className="error-text">{errors.weight}</span>}
          </div>
          
          <div className="form-group">
            <label>Service Level *</label>
            <select
              name="service_level"
              value={formData.service_level}
              onChange={handleChange}
            >
              <option value="standard">Standard (5-7 days)</option>
              <option value="express">Express (2-3 days)</option>
              <option value="overnight">Overnight (1 day)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Cost ($) *</label>
            <input
              type="number"
              name="cost"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              className={errors.cost ? 'error' : ''}
            />
            {errors.cost && <span className="error-text">{errors.cost}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group full-width">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? 'Creating...' : 'Create Shipment'}
        </button>
      </div>
    </form>
  );
};

ShipmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default ShipmentForm;
