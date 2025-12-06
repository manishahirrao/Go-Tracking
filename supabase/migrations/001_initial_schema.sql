-- Migration: Initial Schema
-- Created: 2025-12-06
-- Description: Creates all tables and indexes for the courier system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Shipments table
CREATE TABLE shipments (
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
  dimensions JSONB,
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

CREATE INDEX idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX idx_shipments_current_status ON shipments(current_status);
CREATE INDEX idx_shipments_created_at ON shipments(created_at DESC);
CREATE INDEX idx_shipments_service_level ON shipments(service_level);

-- Shipment status history table
CREATE TABLE shipment_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location TEXT,
  notes TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_status_history_shipment_id ON shipment_status_history(shipment_id);
CREATE INDEX idx_status_history_timestamp ON shipment_status_history(timestamp DESC);

-- Quote requests table
CREATE TABLE quote_requests (
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

CREATE INDEX idx_quotes_customer_email ON quote_requests(customer_email);
CREATE INDEX idx_quotes_status ON quote_requests(status);
CREATE INDEX idx_quotes_created_at ON quote_requests(created_at DESC);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contacts_email ON contact_submissions(email);
CREATE INDEX idx_contacts_status ON contact_submissions(status);
CREATE INDEX idx_contacts_created_at ON contact_submissions(created_at DESC);

-- Pricing rules table
CREATE TABLE pricing_rules (
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

CREATE INDEX idx_pricing_service_level ON pricing_rules(service_level);
CREATE INDEX idx_pricing_active ON pricing_rules(active);
