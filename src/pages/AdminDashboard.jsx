import { useState, useEffect } from 'react';
import { getDashboardSummary } from '../services/dashboardService';
import { useToast } from '../contexts/ToastContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    const { data, error } = await getDashboardSummary();
    
    if (error) {
      showError('Failed to load dashboard data');
      setLoading(false);
      return;
    }

    setMetrics(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={loadDashboardData} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>Active Shipments</h3>
            <p className="metric-value">{metrics?.activeShipments || 0}</p>
            <span className="metric-label">In transit or pending</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>Pending Quotes</h3>
            <p className="metric-value">{metrics?.pendingQuotes || 0}</p>
            <span className="metric-label">Awaiting response</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💵</div>
          <div className="metric-content">
            <h3>Total Revenue</h3>
            <p className="metric-value">${metrics?.totalRevenue?.toFixed(2) || '0.00'}</p>
            <span className="metric-label">All time</span>
          </div>
        </div>
      </div>

      <div className="status-distribution">
        <h2>Shipment Status Distribution</h2>
        <div className="status-grid">
          {metrics?.statusDistribution && Object.entries(metrics.statusDistribution).map(([status, count]) => (
            <div key={status} className="status-item">
              <span className={`status-badge ${status}`}>{status}</span>
              <span className="status-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/admin/shipments" className="action-btn">
            <span>📦</span>
            Create Shipment
          </a>
          <a href="/admin/quotes" className="action-btn">
            <span>💰</span>
            Review Quotes
          </a>
          <a href="/admin/reports" className="action-btn">
            <span>📈</span>
            View Reports
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
