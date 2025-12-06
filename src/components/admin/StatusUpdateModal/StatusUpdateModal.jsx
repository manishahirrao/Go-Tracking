import { useState } from 'react';
import PropTypes from 'prop-types';
import './StatusUpdateModal.css';

const StatusUpdateModal = ({ shipment, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    status: shipment.current_status,
    location: shipment.current_location || '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Update Shipment Status</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="shipment-info">
            <strong>Tracking:</strong> {shipment.tracking_number}
            <br />
            <strong>Recipient:</strong> {shipment.recipient_name}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="pending">Pending</option>
                <option value="picked_up">Picked Up</option>
                <option value="in_transit">In Transit</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Chicago Distribution Center"
              />
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="3"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="modal-actions">
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

StatusUpdateModal.propTypes = {
  shipment: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default StatusUpdateModal;
