import { useState, useEffect } from 'react';
import { getAllShipments, createShipment, updateShipmentStatus } from '../services/shipmentService';
import { useToast } from '../contexts/ToastContext';
import ShipmentForm from '../components/admin/ShipmentForm/ShipmentForm';
import ShipmentList from '../components/admin/ShipmentList/ShipmentList';
import './AdminShipments.css';

const AdminShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async () => {
    setLoading(true);
    const { data, error } = await getAllShipments();
    
    if (error) {
      showError('Failed to load shipments');
      setLoading(false);
      return;
    }

    setShipments(data || []);
    setLoading(false);
  };

  const handleCreateShipment = async (shipmentData) => {
    const { data, error } = await createShipment(shipmentData);
    
    if (error) {
      showError('Failed to create shipment');
      return;
    }

    showSuccess(`Shipment created! Tracking: ${data.tracking_number}`);
    setShowForm(false);
    loadShipments();
  };

  const handleUpdateStatus = async (shipmentId, statusData) => {
    const { error } = await updateShipmentStatus(shipmentId, statusData);
    
    if (error) {
      showError('Failed to update shipment status');
      return;
    }

    showSuccess('Shipment status updated');
    loadShipments();
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesStatus = !filters.status || shipment.current_status === filters.status;
    const matchesSearch = !filters.search || 
      shipment.tracking_number.toLowerCase().includes(filters.search.toLowerCase()) ||
      shipment.recipient_name.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="admin-shipments">
      <div className="shipments-header">
        <h1>Shipment Management</h1>
        <button 
          className="create-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Create Shipment'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <ShipmentForm 
            onSubmit={handleCreateShipment}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Search by tracking number or recipient..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="search-input"
        />
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="status-filter"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading shipments...</p>
        </div>
      ) : (
        <ShipmentList 
          shipments={filteredShipments}
          onUpdateStatus={handleUpdateStatus}
          onSelectShipment={setSelectedShipment}
        />
      )}
    </div>
  );
};

export default AdminShipments;
