-- Migration: Functions and Triggers
-- Created: 2025-12-06
-- Description: Creates functions and triggers for automation

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for shipments table
CREATE TRIGGER update_shipments_updated_at
    BEFORE UPDATE ON shipments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for pricing_rules table
CREATE TRIGGER update_pricing_rules_updated_at
    BEFORE UPDATE ON pricing_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create status history entry
CREATE OR REPLACE FUNCTION create_status_history_entry()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') OR (OLD.current_status IS DISTINCT FROM NEW.current_status) THEN
        INSERT INTO shipment_status_history (shipment_id, status, location, notes, timestamp)
        VALUES (NEW.id, NEW.current_status, NEW.current_location, NEW.notes, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create status history
CREATE TRIGGER auto_create_status_history
    AFTER INSERT OR UPDATE OF current_status ON shipments
    FOR EACH ROW
    EXECUTE FUNCTION create_status_history_entry();
