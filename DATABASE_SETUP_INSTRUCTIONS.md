# Database Setup Instructions

This document provides step-by-step instructions for setting up your Supabase database for the courier website.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- A Supabase project created
- Your Supabase credentials added to `.env` file

## Option 1: Quick Setup (Recommended)

Run the complete setup script that includes everything:

1. Open your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"
4. Open the file `courier/supabase/setup_database.sql`
5. Copy the entire contents and paste into the SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. Wait for completion (should take 5-10 seconds)

This will:
- Create all 5 tables (shipments, shipment_status_history, quote_requests, contact_submissions, pricing_rules)
- Set up all indexes for performance
- Configure Row Level Security (RLS) policies
- Create triggers for automatic timestamp updates
- Enable real-time subscriptions
- **Seed initial pricing rules data** (Standard, Express, Overnight)

## Option 2: Step-by-Step Migration

If you prefer to run migrations one at a time:

### Step 1: Create Tables
```sql
-- Run: courier/supabase/migrations/001_initial_schema.sql
```

### Step 2: Set Up Security
```sql
-- Run: courier/supabase/migrations/002_rls_policies.sql
```

### Step 3: Add Automation
```sql
-- Run: courier/supabase/migrations/003_functions_triggers.sql
```

### Step 4: Seed Pricing Data
```sql
-- Run: courier/supabase/migrations/004_seed_data.sql
```

This inserts 3 pricing rules:
- **Standard**: $10 base + $2/kg + $0.50/km (5-7 days)
- **Express**: $20 base + $3/kg + $0.75/km (2-3 days)
- **Overnight**: $40 base + $5/kg + $1.00/km (1 day)

### Step 5: Enable Real-time
```sql
-- Run: courier/supabase/migrations/005_enable_realtime.sql
```

## Verify Setup

After running the setup, verify everything is working:

### 1. Check Tables

Go to "Table Editor" in Supabase dashboard. You should see:
- ✅ shipments
- ✅ shipment_status_history
- ✅ quote_requests
- ✅ contact_submissions
- ✅ pricing_rules

### 2. Check Pricing Rules

Click on the `pricing_rules` table. You should see 3 rows:

| service_level | base_price | price_per_kg | price_per_km | active |
|---------------|------------|--------------|--------------|--------|
| standard      | 10.00      | 2.00         | 0.50         | true   |
| express       | 20.00      | 3.00         | 0.75         | true   |
| overnight     | 40.00      | 5.00         | 1.00         | true   |

### 3. Check RLS Policies

Go to "Authentication" → "Policies". Each table should have policies configured.

### 4. Check Real-time

Go to "Database" → "Replication". The following tables should be enabled:
- ✅ shipments
- ✅ shipment_status_history

## Test the Application

1. Start your development server:
```bash
cd courier
npm run dev
```

2. Open http://localhost:5173

3. Test each feature:
   - **Cost Calculator**: Go to "Get Quote" → Should load 3 service levels
   - **Quote Request**: Submit a quote → Should save to database
   - **Contact Form**: Submit a message → Should save to database
   - **Tracking**: Will work once you create a shipment (see Admin section)

## Creating Test Shipments (For Testing Tracking)

Since there's no admin UI yet, you can create test shipments directly in Supabase:

1. Go to "Table Editor" → "shipments"
2. Click "Insert row"
3. Fill in the required fields:
   - tracking_number: `TRK-2025-000001`
   - sender_name: `Test Sender`
   - sender_address: `123 Main St, New York, NY`
   - recipient_name: `Test Recipient`
   - recipient_address: `456 Oak Ave, Los Angeles, CA`
   - weight: `5.5`
   - service_level: `express`
   - current_status: `in_transit`
   - current_location: `Chicago Hub`
   - cost: `35.00`
4. Click "Save"

Now you can track this shipment using tracking number `TRK-2025-000001`!

## Troubleshooting

### "relation does not exist" error
- Make sure you ran the schema creation script (001_initial_schema.sql)
- Check that you're connected to the correct Supabase project

### Pricing calculator shows "Loading options..."
- Verify pricing_rules table has data (run 004_seed_data.sql)
- Check browser console for errors
- Verify your .env file has correct Supabase credentials

### Real-time updates not working
- Make sure you ran 005_enable_realtime.sql
- Check that Realtime is enabled in Supabase dashboard
- Verify WebSocket connection in browser dev tools

### "Failed to fetch" errors
- Check your .env file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- Restart your development server after changing .env
- Verify your Supabase project is active (not paused)

## Next Steps

After setup is complete:
1. ✅ Database is ready
2. ✅ Pricing rules are seeded
3. ✅ Application can connect to Supabase
4. 🔄 Create test shipments for tracking
5. 🔄 Build admin dashboard (optional, future task)

## Updating Pricing Rules

To update pricing rules later:

```sql
-- Update standard service pricing
UPDATE pricing_rules
SET base_price = 12.00, price_per_kg = 2.50
WHERE service_level = 'standard';

-- Add a new service level
INSERT INTO pricing_rules (service_level, base_price, price_per_kg, price_per_km, active)
VALUES ('same_day', 60.00, 7.00, 1.50, true);
```

## Support

If you encounter issues:
1. Check the Supabase logs in your dashboard
2. Check browser console for JavaScript errors
3. Verify all environment variables are set correctly
4. Refer to SUPABASE_SETUP.md for initial setup help
