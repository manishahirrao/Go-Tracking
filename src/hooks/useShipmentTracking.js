import { useState, useEffect, useCallback } from 'react';
import {
  getShipmentByTrackingNumber,
  getShipmentHistory,
  subscribeToShipment,
  unsubscribeFromShipment
} from '../services/shipmentService';

/**
 * Custom hook for tracking shipments with real-time updates
 * @param {string} trackingNumber - The tracking number to track
 * @param {boolean} enableRealtime - Whether to enable real-time updates (default: true)
 * @returns {Object} Shipment data, history, loading state, error, and refetch function
 */
export const useShipmentTracking = (trackingNumber, enableRealtime = true) => {
  const [shipment, setShipment] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  // Fetch shipment data
  const fetchShipment = useCallback(async () => {
    if (!trackingNumber) {
      setShipment(null);
      setHistory([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch shipment details
      const shipmentData = await getShipmentByTrackingNumber(trackingNumber);
      
      if (!shipmentData) {
        setError('Shipment not found. Please check your tracking number.');
        setShipment(null);
        setHistory([]);
        return;
      }

      setShipment(shipmentData);

      // Fetch shipment history
      const historyData = await getShipmentHistory(shipmentData.id);
      setHistory(historyData);
    } catch (err) {
      console.error('Error fetching shipment:', err);
      setError(err.message || 'Failed to fetch shipment data');
      setShipment(null);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [trackingNumber]);

  // Initial fetch
  useEffect(() => {
    fetchShipment();
  }, [fetchShipment]);

  // Set up real-time subscription
  useEffect(() => {
    if (!trackingNumber || !enableRealtime || !shipment) {
      return;
    }

    let channel;

    try {
      // Subscribe to shipment updates
      channel = subscribeToShipment(trackingNumber, (updatedShipment) => {
        console.log('Real-time update received:', updatedShipment);
        setShipment(updatedShipment);
        setIsConnected(true);

        // Refetch history when shipment updates
        if (updatedShipment.id) {
          getShipmentHistory(updatedShipment.id)
            .then(setHistory)
            .catch(console.error);
        }
      });

      // Monitor connection status
      const connectionCheckInterval = setInterval(() => {
        // This is a simple check - in production you might want more sophisticated monitoring
        if (channel && channel.state === 'joined') {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      }, 5000);

      // Cleanup function
      return () => {
        clearInterval(connectionCheckInterval);
        if (channel) {
          unsubscribeFromShipment(channel);
        }
      };
    } catch (err) {
      console.error('Error setting up real-time subscription:', err);
      setIsConnected(false);
    }
  }, [trackingNumber, enableRealtime, shipment]);

  // Refetch function for manual refresh
  const refetch = useCallback(() => {
    fetchShipment();
  }, [fetchShipment]);

  return {
    shipment,
    history,
    loading,
    error,
    isConnected,
    refetch
  };
};

export default useShipmentTracking;
