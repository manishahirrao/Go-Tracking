import { useState } from 'react';
import PropTypes from 'prop-types';
import StatusUpdateModal from '../StatusUpdateModal/StatusUpdateModal';
import './ShipmentList.css';

const ShipmentList = ({ shipments, onUpdateStatus }) => {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  const handleUpdateClick = (shipment) => {
    setSelectedShipment(shipment);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = async (statusData) => {
    await onUpdateStatus(selectedShipment.id, statusData);
    setShowStatusModal(false);
    setSelectedShipment(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (shipments.length === 0) {
    return (
      <div className="empty-state">
        <p>📦 No shipments found</p>
        <span>Create your first shipment to get started</span>
      </div>
    );
  }

  return (
    <>
      <div className="shipment-list">
        <div className="list-header">
          <div className="header-cell">Tracking #</div>
          <div className="header-cell">Recipient</div>
          <div className="header-cell">Status</div>
          <div className="header-cell">Service</div>
          <div className="header-cell">Cost</div>
          <div className="header-cell">Created</div>
          <div className="header-cell">Actions</div>
        </div>

        {shipments.map(shipment => (
          <div key={shipment.id} className="list-row">
            <div className="cell tracking">
              <strong>{shipment.tracking_number}</strong>
            </div>
            <div className="cell">
              <div className="recipient-info">
                <strong>{shipment.recipient_name}</strong>
                <span className="address">{shipment.recipient_address}</span>
              </div>
            </div>
            <div className="cell">
              <span className={`status-badge ${shipment.current_status}`}>
                {shipment.current_status.replace('_', ' ')}
              </span>
              {shipment.current_location && (
                <span className="location">📍 {shipment.current_location}</span>
              )}
            </div>
            <div className="cell">
              <span className="service-badge">{shipment.service_level}</span>
            </div>
            <div className="cell cost">
              ${parseFloat(shipment.cost).toFixed(2)}
            </div>
            <div className="cell date">
              {formatDate(shipment.created_at)}
            </div>
            <div className="cell actions">
              <button 
                className="update-btn"
                onClick={() => handleUpdateClick(shipment)}
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {showStatusModal && (
        <StatusUpdateModal
          shipment={selectedShipment}
          onUpdate={handleStatusUpdate}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedShipment(null);
          }}
        />
      )}
    </>
  );
};

ShipmentList.propTypes = {
  shipments: PropTypes.array.isRequired,
  onUpdateStatus: PropTypes.func.isRequired
};

export default ShipmentList;
