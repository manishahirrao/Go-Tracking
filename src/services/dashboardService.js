import { supabase } from '../lib/supabase';

/**
 * Dashboard Service
 * Provides analytics and metrics for the admin dashboard
 */

/**
 * Get count of active shipments (not delivered or cancelled)
 */
export const getActiveShipmentsCount = async () => {
  try {
    const { count, error } = await supabase
      .from('shipments')
      .select('*', { count: 'exact', head: true })
      .not('current_status', 'in', '(delivered,cancelled)');

    if (error) throw error;
    return { data: count, error: null };
  } catch (error) {
    console.error('Error getting active shipments count:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get count of pending quote requests
 */
export const getPendingQuotesCount = async () => {
  try {
    const { count, error } = await supabase
      .from('quote_requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (error) throw error;
    return { data: count, error: null };
  } catch (error) {
    console.error('Error getting pending quotes count:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get total revenue from all shipments
 */
export const getTotalRevenue = async () => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('cost');

    if (error) throw error;

    const total = data.reduce((sum, shipment) => sum + (parseFloat(shipment.cost) || 0), 0);
    return { data: total, error: null };
  } catch (error) {
    console.error('Error getting total revenue:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get shipment status distribution
 */
export const getStatusDistribution = async () => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('current_status');

    if (error) throw error;

    const distribution = data.reduce((acc, shipment) => {
      const status = shipment.current_status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return { data: distribution, error: null };
  } catch (error) {
    console.error('Error getting status distribution:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get revenue by date range
 */
export const getRevenueByDateRange = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('cost, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) throw error;

    const total = data.reduce((sum, shipment) => sum + (parseFloat(shipment.cost) || 0), 0);
    return { data: { total, count: data.length, shipments: data }, error: null };
  } catch (error) {
    console.error('Error getting revenue by date range:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get shipment volume report
 */
export const getShipmentVolumeReport = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('service_level, created_at, current_status')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: true });

    if (error) throw error;

    // Group by service level
    const byServiceLevel = data.reduce((acc, shipment) => {
      const level = shipment.service_level;
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

    // Group by status
    const byStatus = data.reduce((acc, shipment) => {
      const status = shipment.current_status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    return {
      data: {
        total: data.length,
        byServiceLevel,
        byStatus,
        shipments: data
      },
      error: null
    };
  } catch (error) {
    console.error('Error getting shipment volume report:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Export report data to CSV format
 */
export const exportReportToCSV = (data, filename = 'report.csv') => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape commas and quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return { success: true, error: null };
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Get dashboard summary with all key metrics
 */
export const getDashboardSummary = async () => {
  try {
    const [activeShipments, pendingQuotes, revenue, statusDist] = await Promise.all([
      getActiveShipmentsCount(),
      getPendingQuotesCount(),
      getTotalRevenue(),
      getStatusDistribution()
    ]);

    return {
      data: {
        activeShipments: activeShipments.data,
        pendingQuotes: pendingQuotes.data,
        totalRevenue: revenue.data,
        statusDistribution: statusDist.data
      },
      error: null
    };
  } catch (error) {
    console.error('Error getting dashboard summary:', error);
    return { data: null, error: error.message };
  }
};
