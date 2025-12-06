-- Migration: Row Level Security Policies
-- Created: 2025-12-06
-- Description: Sets up RLS policies for all tables

-- Enable RLS on all tables
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

-- Shipments policies
CREATE POLICY "Public shipments read" ON shipments
  FOR SELECT USING (true);

CREATE POLICY "Public shipments write" ON shipments
  FOR ALL USING (true);

-- Shipment status history policies
CREATE POLICY "Public status history read" ON shipment_status_history
  FOR SELECT USING (true);

CREATE POLICY "Public status history write" ON shipment_status_history
  FOR ALL USING (true);

-- Quote requests policies
CREATE POLICY "Public quotes read" ON quote_requests
  FOR SELECT USING (true);

CREATE POLICY "Public quotes insert" ON quote_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public quotes update" ON quote_requests
  FOR UPDATE USING (true);

-- Contact submissions policies
CREATE POLICY "Public contacts insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public contacts read" ON contact_submissions
  FOR SELECT USING (true);

CREATE POLICY "Public contacts update" ON contact_submissions
  FOR UPDATE USING (true);

-- Pricing rules policies
CREATE POLICY "Public pricing read" ON pricing_rules
  FOR SELECT USING (true);

CREATE POLICY "Public pricing write" ON pricing_rules
  FOR ALL USING (true);
