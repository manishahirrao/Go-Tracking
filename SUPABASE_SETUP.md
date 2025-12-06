# Supabase Setup Guide

This guide will walk you through setting up Supabase for the courier website.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign In"
3. Sign up with GitHub, Google, or email

## Step 2: Create a New Project

1. Once logged in, click "New Project"
2. Fill in the project details:
   - **Name**: `courier-app` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Select "Free" to start
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be provisioned

## Step 3: Get Your API Credentials

1. In your Supabase project dashboard, click on the **Settings** icon (gear icon) in the left sidebar
2. Click on **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: Something like `https://abcdefghijklmnop.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`

## Step 4: Configure Your Local Environment

1. Open the `.env` file in the `courier` folder
2. Replace the placeholder values with your actual credentials:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key...
```

3. Save the file

## Step 5: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Open the browser console (F12)
3. You should NOT see any Supabase configuration errors
4. If you see "Missing Supabase environment variables", double-check your `.env` file

## Next Steps

After completing this setup, you're ready to:
1. Create the database schema (Task 2)
2. Start integrating Supabase into your application

## Important Notes

- **Never commit your `.env` file** - It's already in `.gitignore`
- **Keep your anon key safe** - While it's called "public", it should still be protected
- **Database password** - You'll need this if you want to connect directly to the database
- **Free tier limits**: 
  - 500 MB database space
  - 1 GB file storage
  - 2 GB bandwidth per month
  - Unlimited API requests

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure your `.env` file is in the `courier` folder (not the root)
- Restart your development server after changing `.env`
- Check that variable names start with `VITE_` (required for Vite)

### Can't connect to Supabase
- Verify your Project URL is correct (no trailing slash)
- Verify your anon key is the full key (it's very long)
- Check your internet connection
- Make sure your Supabase project is active (not paused)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Dashboard](https://app.supabase.com)


## Step 5: Create Database Schema

1. In your Supabase project dashboard, click on the **SQL Editor** icon in the left sidebar
2. Click "New query"
3. Open the file `courier/supabase/setup_database.sql` from your project
4. Copy the entire contents
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. Wait for the query to complete (should take a few seconds)
8. You should see "Success. No rows returned" - this is normal!

### Verify Database Setup

1. Click on the **Table Editor** icon in the left sidebar
2. You should see 5 tables:
   - `shipments`
   - `shipment_status_history`
   - `quote_requests`
   - `contact_submissions`
   - `pricing_rules`
3. Click on `pricing_rules` table
4. You should see 3 rows (standard, express, overnight)

## Alternative: Run Migrations Separately

If you prefer to run migrations one at a time:

1. Run `001_initial_schema.sql` - Creates all tables
2. Run `002_rls_policies.sql` - Sets up security policies
3. Run `003_functions_triggers.sql` - Creates automation
4. Run `004_seed_data.sql` - Inserts pricing rules
5. Run `005_enable_realtime.sql` - Enables real-time updates
