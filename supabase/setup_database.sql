-- =====================================================
-- Courier Website Database Schema
-- =====================================================
-- This script creates all tables, indexes, and policies
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. SHIPMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  sender_address TEXT NOT NULL,
  sender_phone VARCHAR(20),
  sender_email VARCHAR(255),
  recipient_name VARCHAR(255) NOT NULL,
  recipient_address TEXT NOT NULL,
  recipient_phone VARCHAR(20),
  recipient_email VARCHAR(255),
  weight DECIMAL(10, 2) NOT NULL CHECK (weight > 0),
  dimensions JSONB, -- {length, width, height}
  service_level VARCHAR(50) NOT NULL CHECK (service_level IN ('standard', 'express', 'overnight')),
  current_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (current_status IN ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled')),
  current_location TEXT,
  estimated_delivery TIMESTAMP,
  actual_delivery TIMESTAMP,
  cost DECIMAL(10, 2) CHECK (cost >= 0),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for shipments
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_current_status ON shipments(current_status);
CREATE INDEX IF NOT EXISTS idx_shipments_created_at ON shipments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shipments_service_level ON shipments(service_level);

-- =====================================================
-- 2. SHIPMENT STATUS HISTORY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS shipment_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location TEXT,
  notes TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Indexes for shipment_status_history
CREATE INDEX IF NOT EXISTS idx_status_history_shipment_id ON shipment_status_history(shipment_id);
CREATE INDEX IF NOT EXISTS idx_status_history_timestamp ON shipment_status_history(timestamp DESC);

-- =====================================================
-- 3. QUOTE REQUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  origin_address TEXT NOT NULL,
  destination_address TEXT NOT NULL,
  weight DECIMAL(10, 2) CHECK (weight > 0),
  dimensions JSONB,
  service_level VARCHAR(50),
  description TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'accepted', 'rejected')),
  quoted_price DECIMAL(10, 2) CHECK (quoted_price >= 0),
  quoted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for quote_requests
CREATE INDEX IF NOT EXISTS idx_quotes_customer_email ON quote_requests(customer_email);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quote_requests(created_at DESC);

-- =====================================================
-- 4. CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for contact_submissions
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contact_submissions(created_at DESC);

-- =====================================================
-- 5. PRICING RULES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS pricing_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_level VARCHAR(50) NOT NULL UNIQUE,
  base_price DECIMAL(10, 2) NOT NULL CHECK (base_price >= 0),
  price_per_kg DECIMAL(10, 2) NOT NULL CHECK (price_per_kg >= 0),
  price_per_km DECIMAL(10, 2) CHECK (price_per_km >= 0),
  min_price DECIMAL(10, 2) CHECK (min_price >= 0),
  max_weight DECIMAL(10, 2) CHECK (max_weight > 0),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for pricing_rules
CREATE INDEX IF NOT EXISTS idx_pricing_service_level ON pricing_rules(service_level);
CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing_rules(active);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

-- Shipments: Public read access
CREATE POLICY "Public shipments read" ON shipments
  FOR SELECT USING (true);

-- Shipments: Public insert/update (for now, will restrict later with auth)
CREATE POLICY "Public shipments write" ON shipments
  FOR ALL USING (true);

-- Shipment Status History: Public read access
CREATE POLICY "Public status history read" ON shipment_status_history
  FOR SELECT USING (true);

-- Shipment Status History: Public write access
CREATE POLICY "Public status history write" ON shipment_status_history
  FOR ALL USING (true);

-- Quote Requests: Public read access
CREATE POLICY "Public quotes read" ON quote_requests
  FOR SELECT USING (true);

-- Quote Requests: Public insert access
CREATE POLICY "Public quotes insert" ON quote_requests
  FOR INSERT WITH CHECK (true);

-- Quote Requests: Public update access
CREATE POLICY "Public quotes update" ON quote_requests
  FOR UPDATE USING (true);

-- Contact Submissions: Public insert access only
CREATE POLICY "Public contacts insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Contact Submissions: Public read access
CREATE POLICY "Public contacts read" ON contact_submissions
  FOR SELECT USING (true);

-- Contact Submissions: Public update access
CREATE POLICY "Public contacts update" ON contact_submissions
  FOR UPDATE USING (true);

-- Pricing Rules: Public read access
CREATE POLICY "Public pricing read" ON pricing_rules
  FOR SELECT USING (true);

-- Pricing Rules: Public write access (for admin operations)
CREATE POLICY "Public pricing write" ON pricing_rules
  FOR ALL USING (true);

-- =====================================================
-- ENABLE REALTIME
-- =====================================================

-- Enable realtime for shipments table
ALTER PUBLICATION supabase_realtime ADD TABLE shipments;

-- Enable realtime for shipment_status_history table
ALTER PUBLICATION supabase_realtime ADD TABLE shipment_status_history;

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

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

-- Function to automatically create status history entry when shipment status changes
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

-- =====================================================
-- SEED DATA: Initial Pricing Rules
-- =====================================================

INSERT INTO pricing_rules (service_level, base_price, price_per_kg, price_per_km, min_price, max_weight, active)
VALUES 
  ('standard', 10.00, 2.00, 0.50, 10.00, 1000.00, true),
  ('express', 20.00, 3.00, 0.75, 20.00, 500.00, true),
  ('overnight', 40.00, 5.00, 1.00, 40.00, 200.00, true)
ON CONFLICT (service_level) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the setup:

-- Check tables
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check RLS policies
-- SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';

-- Check pricing rules
-- SELECT * FROM pricing_rules;

-- =====================================================
-- COMPLETE!
-- =====================================================
-- Your database is now ready to use!
-- Next steps:
-- 1. Verify all tables were created
-- 2. Test inserting sample data
-- 3. Configure your .env file with Supabase credentials
-- =====================================================
