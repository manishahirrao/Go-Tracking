-- Migration: Enable Realtime
-- Created: 2025-12-06
-- Description: Enables realtime subscriptions for shipments

-- Enable realtime for shipments table
ALTER PUBLICATION supabase_realtime ADD TABLE shipments;

-- Enable realtime for shipment_status_history table
ALTER PUBLICATION supabase_realtime ADD TABLE shipment_status_history;
