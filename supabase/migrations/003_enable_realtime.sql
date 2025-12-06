-- Enable Realtime for shipments table
ALTER PUBLICATION supabase_realtime ADD TABLE shipments;

-- Enable Realtime for shipment_status_history table
ALTER PUBLICATION supabase_realtime ADD TABLE shipment_status_history;

-- Note: This allows real-time subscriptions to these tables
-- Clients can subscribe to changes and receive updates instantly
