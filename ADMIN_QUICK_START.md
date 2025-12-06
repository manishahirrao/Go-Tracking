# Admin Dashboard - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Start the Application
```bash
cd courier
npm run dev
```

### Step 2: Access Admin Dashboard
Open your browser and go to:
```
http://localhost:5173/admin
```

### Step 3: Create Your First Shipment

1. Click on **"Shipments"** in the sidebar
2. Click **"+ Create Shipment"** button
3. Fill in the form:

**Sender Information:**
- Name: `John Doe`
- Address: `123 Main St, New York, NY 10001`
- Phone: `+1-555-0100` (optional)
- Email: `john@example.com` (optional)

**Recipient Information:**
- Name: `Jane Smith`
- Address: `456 Oak Ave, Los Angeles, CA 90001`
- Phone: `+1-555-0200` (optional)
- Email: `jane@example.com` (optional)

**Shipment Details:**
- Weight: `5.5` kg
- Service Level: `Express`
- Cost: `45.00` USD
- Notes: `Handle with care` (optional)

4. Click **"Create Shipment"**
5. Copy the tracking number (e.g., `TRK-2025-123456`)

### Step 4: Track the Shipment

1. Open a new tab and go to: `http://localhost:5173/tracking`
2. Enter the tracking number you copied
3. Click **"Track Package"**
4. You'll see the shipment details and status

### Step 5: Update Shipment Status

1. Go back to `/admin/shipments`
2. Find your shipment in the list
3. Click **"Update Status"**
4. Change status to: `In Transit`
5. Set location to: `Chicago Distribution Center`
6. Add note: `Package sorted and loaded`
7. Click **"Update Status"**

### Step 6: See Real-Time Updates

1. Go back to the tracking page tab
2. Watch the status update automatically (no refresh needed!)
3. See the new status in the timeline

## 📊 Explore Other Features

### View Dashboard Metrics
- Go to `/admin` (dashboard home)
- See active shipments, pending quotes, and revenue
- View status distribution chart

### Manage Quote Requests
- Go to `/admin/quotes`
- View customer quote requests
- Provide pricing for pending quotes
- Accept or reject quotes

### Manage Contact Submissions
- Go to `/admin/contacts`
- View customer inquiries
- Update status (new → in progress → resolved)
- Reply via email

### Generate Reports
- Go to `/admin/reports`
- Select "Revenue Report" or "Shipment Volume Report"
- Choose date range (default: last 30 days)
- Click "Generate Report"
- Export to CSV if needed

## 🎯 Common Tasks

### Create Multiple Test Shipments

**Standard Service:**
```
Sender: Alice Johnson, 789 Elm St, Boston, MA 02101
Recipient: Bob Wilson, 321 Pine Rd, Seattle, WA 98101
Weight: 2.5 kg, Service: Standard, Cost: $25.00
```

**Overnight Service:**
```
Sender: Carol Davis, 555 Maple Dr, Miami, FL 33101
Recipient: David Brown, 888 Cedar Ln, Denver, CO 80201
Weight: 1.0 kg, Service: Overnight, Cost: $65.00
```

### Test Status Progression

Update a shipment through all statuses:
1. `Pending` → Initial state
2. `Picked Up` → Package collected
3. `In Transit` → On the way
4. `Out for Delivery` → Final mile
5. `Delivered` → Complete

### Test Quote Workflow

1. Go to public site: `/quote`
2. Fill out "Request Quote" tab
3. Submit the form
4. Go to `/admin/quotes`
5. Find your quote request
6. Click "Provide Quote"
7. Enter price: `$50.00`
8. Click "Submit"
9. Mark as "Accepted"

## 🔍 Troubleshooting

### Can't See Shipments
- Check if Supabase is configured (`.env` file)
- Check browser console for errors
- Verify database has `shipments` table

### Tracking Number Not Found
- Make sure you copied the full tracking number
- Check it's in format: `TRK-YYYY-NNNNNN`
- Verify shipment was created successfully

### Real-Time Updates Not Working
- Check if Realtime is enabled in Supabase
- Look for WebSocket connection in browser dev tools
- Refresh the page and try again

### Dashboard Shows Zero Metrics
- Create some test shipments first
- Click the "Refresh" button
- Check browser console for errors

## 📱 Mobile Testing

The admin dashboard is responsive! Test on mobile:
1. Open Chrome DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select a mobile device
4. Navigate through admin pages

## 🎓 Next Steps

1. **Create 5-10 test shipments** with different statuses
2. **Test the tracking page** with each tracking number
3. **Generate a report** to see analytics
4. **Submit test quotes** and manage them
5. **Submit test contacts** and manage them

## 💡 Pro Tips

- Use the **search bar** in shipments to quickly find packages
- Use **status filters** to see only pending or in-transit shipments
- **Export reports** to CSV for analysis in Excel
- Keep the **tracking page open** while updating status to see real-time updates
- Use the **sidebar toggle** (← →) to collapse/expand navigation

## 🎉 You're Ready!

You now have a fully functional admin dashboard for managing your courier operations. Create shipments, track packages, manage quotes, and generate reports all from one place.

---

**Need Help?** Check `ADMIN_DASHBOARD_IMPLEMENTATION.md` for detailed documentation.
