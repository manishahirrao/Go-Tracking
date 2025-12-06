-- Migration: Seed Data
-- Created: 2025-12-06
-- Description: Inserts initial pricing rules

INSERT INTO pricing_rules (service_level, base_price, price_per_kg, price_per_km, min_price, max_weight, active)
VALUES 
  ('standard', 10.00, 2.00, 0.50, 10.00, 1000.00, true),
  ('express', 20.00, 3.00, 0.75, 20.00, 500.00, true),
  ('overnight', 40.00, 5.00, 1.00, 40.00, 200.00, true)
ON CONFLICT (service_level) DO NOTHING;
