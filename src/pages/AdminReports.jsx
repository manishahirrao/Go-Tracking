import { useState } from 'react';
import { getRevenueByDateRange, getShipmentVolumeReport, exportReportToCSV } from '../services/dashboardService';
import { useToast } from '../contexts/ToastContext';
import './AdminReports.css';

const AdminReports = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const generateReport = async () => {
    setLoading(true);
    
    let result;
    if (reportType === 'revenue') {
      result = await getRevenueByDateRange(dateRange.startDate, dateRange.endDate);
    } else {
      result = await getShipmentVolumeReport(dateRange.startDate, dateRange.endDate);
    }

    if (result.error) {
      showError('Failed to generate report');
      setLoading(false);
      return;
    }

    setReportData(result.data);
    setLoading(false);
  };

  const handleExport = () => {
    if (!reportData) return;

    let exportData;
    if (reportType === 'revenue') {
      exportData = reportData.shipments.map(s => ({
        tracking_number: s.tracking_number,
        created_at: new Date(s.created_at).toLocaleDateString(),
        cost: s.cost
      }));
    } else {
      exportData = reportData.shipments.map(s => ({
        tracking_number: s.tracking_number,
        service_level: s.service_level,
        status: s.current_status,
        created_at: new Date(s.created_at).toLocaleDateString()
      }));
    }

    const filename = `${reportType}_report_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
    const result = exportReportToCSV(exportData, filename);
    
    if (result.success) {
      showSuccess('Report exported successfully');
    } else {
      showError('Failed to export report');
    }
  };

  return (
    <div className="admin-reports">
      <h1>Reports & Analytics</h1>

      <div className="report-controls">
        <div className="control-group">
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="revenue">Revenue Report</option>
            <option value="volume">Shipment Volume Report</option>
          </select>
        </div>

        <div className="control-group">
          <label>Start Date</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
          />
        </div>

        <div className="control-group">
          <label>End Date</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
          />
        </div>

        <button onClick={generateReport} disabled={loading} className="generate-btn">
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {reportData && (
        <div className="report-results">
          <div className="results-header">
            <h2>{reportType === 'revenue' ? 'Revenue Report' : 'Shipment Volume Report'}</h2>
            <button onClick={handleExport} className="export-btn">
              📥 Export CSV
            </button>
          </div>

          {reportType === 'revenue' ? (
            <RevenueReport data={reportData} />
          ) : (
            <VolumeReport data={reportData} />
          )}
        </div>
      )}
    </div>
  );
};

const RevenueReport = ({ data }) => (
  <div className="report-content">
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Total Revenue</h3>
        <p className="big-number">${data.total.toFixed(2)}</p>
      </div>
      <div className="summary-card">
        <h3>Total Shipments</h3>
        <p className="big-number">{data.count}</p>
      </div>
      <div className="summary-card">
        <h3>Average per Shipment</h3>
        <p className="big-number">${(data.total / data.count || 0).toFixed(2)}</p>
      </div>
    </div>
  </div>
);

const VolumeReport = ({ data }) => (
  <div className="report-content">
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Total Shipments</h3>
        <p className="big-number">{data.total}</p>
      </div>
    </div>

    <div className="breakdown-section">
      <h3>By Service Level</h3>
      <div className="breakdown-grid">
        {Object.entries(data.byServiceLevel).map(([level, count]) => (
          <div key={level} className="breakdown-item">
            <span className="breakdown-label">{level}</span>
            <span className="breakdown-value">{count}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="breakdown-section">
      <h3>By Status</h3>
      <div className="breakdown-grid">
        {Object.entries(data.byStatus).map(([status, count]) => (
          <div key={status} className="breakdown-item">
            <span className="breakdown-label">{status.replace('_', ' ')}</span>
            <span className="breakdown-value">{count}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminReports;
