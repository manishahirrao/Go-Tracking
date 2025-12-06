# API Documentation

Complete documentation for all service functions in the courier website.

## Table of Contents

1. [Shipment Service](#shipment-service)
2. [Pricing Service](#pricing-service)
3. [Quote Service](#quote-service)
4. [Contact Service](#contact-service)
5. [Error Handling](#error-handling)
6. [Data Models](#data-models)

---

## Shipment Service

Location: `src/services/shipmentService.js`

### getShipmentByTrackingNumber(trackingNumber)

Retrieves a shipment by its tracking number.

**Parameters:**
- `trackingNumber` (string): The tracking number to search for

**Returns:** `Promise<Object|null>`
- Returns shipment object if found
- Returns null if not found

**Example:**
```javascript
const shipment = await getShipmentByTrackingNumber('TRK-2025-000001');
if (shipment) {
  console.log(shipment.current_status);
}
```

### getShipmentHistory(shipmentId)

Retrieves the complete status history for a shipment.

**Parameters:**
- `shipmentId` (string): The shipment UUID

**Returns:** `Promise<Array>`
- Array of status history entries, ordered by timestamp

**Example:**
```javascript
const history = await getShipmentHistory(shipment.id);
history.forEach(entry => {
  console.log(`${entry.status} at ${entry.location} on ${entry.timestamp}`);
});
```

### createShipment(shipmentData)

Creates a new shipment (Admin function).

**Parameters:**
- `shipmentData` (object):
  - `sender_name` (string, required)
  - `sender_address` (string, required)
  - `sender_phone` (string, optional)
  - `sender_email` (string, optional)
  - `recipient_name` (string, required)
  - `recipient_address` (string, required)
  - `recipient_phone` (string, optional)
  - `recipient_email` (string, optional)
  - `weight` (number, required)
  - `dimensions` (object, optional): {length, width, height}
  - `service_level` (string, required): 'standard', 'express', or 'overnight'
  - `current_location` (string, optional)
  - `cost` (number, optional)

**Returns:** `Promise<Object>`
- Created shipment with generated tracking number

**Example:**
```javascript
const shipment = await createShipment({
  sender_name: 'John Doe',
  sender_address: '123 Main St, New York, NY',
  recipient_name: 'Jane Smith',
  recipient_address: '456 Oak Ave, Los Angeles, CA',
  weight: 5.5,
  service_level: 'express',
  cost: 35.00
});
console.log(`Tracking number: ${shipment.tracking_number}`);
```

### updateShipmentStatus(shipmentId, status, location, notes)

Updates the status of a shipment (Admin function).

**Parameters:**
- `shipmentId` (string, required): The shipment UUID
- `status` (string, required): New status ('pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled')
- `location` (string, optional): Current location
- `notes` (string, optional): Additional notes

**Returns:** `Promise<Object>`
- Updated shipment object

**Example:**
```javascript
const updated = await updateShipmentStatus(
  shipmentId,
  'in_transit',
  'Chicago Hub',
  'Package sorted and loaded'
);
```

### subscribeToShipment(trackingNumber, callback)

Subscribes to real-time updates for a shipment.

**Parameters:**
- `trackingNumber` (string): The tracking number to subscribe to
- `callback` (function): Function called when shipment updates

**Returns:** `Object`
- Supabase channel object

**Example:**
```javascript
const channel = subscribeToShipment('TRK-2025-000001', (updatedShipment) => {
  console.log('Shipment updated:', updatedShipment);
  setShipment(updatedShipment);
});

// Later, unsubscribe
await unsubscribeFromShipment(channel);
```

### unsubscribeFromShipment(channel)

Unsubscribes from shipment updates.

**Parameters:**
- `channel` (object): The Supabase channel to unsubscribe from

**Returns:** `Promise<void>`

---

## Pricing Service

Location: `src/services/pricingService.js`

### getPricingRules()

Retrieves all active pricing rules.

**Returns:** `Promise<Array>`
- Array of pricing rule objects

**Example:**
```javascript
const rules = await getPricingRules();
rules.forEach(rule => {
  console.log(`${rule.service_level}: $${rule.base_price} + $${rule.price_per_kg}/kg`);
});
```

### calculateShippingCost(params)

Calculates shipping cost for given parameters.

**Parameters:**
- `params` (object):
  - `weight` (number, required): Package weight in kg
  - `dimensions` (object, optional): {length, width, height}
  - `origin` (string, required): Origin address
  - `destination` (string, required): Destination address
  - `service_level` (string, optional): Specific service level to calculate

**Returns:** `Promise<Array>`
- Array of pricing options (one per service level)

**Example:**
```javascript
const pricing = await calculateShippingCost({
  weight: 10,
  origin: 'New York, NY',
  destination: 'Los Angeles, CA',
  service_level: 'express'
});

console.log(`Total cost: $${pricing[0].total_cost}`);
console.log(`Base: $${pricing[0].base_price}`);
console.log(`Weight charge: $${pricing[0].weight_charge}`);
console.log(`Distance charge: $${pricing[0].distance_charge}`);
```

### updatePricingRule(ruleId, updates)

Updates a pricing rule (Admin function).

**Parameters:**
- `ruleId` (string): Pricing rule UUID
- `updates` (object): Fields to update

**Returns:** `Promise<Object>`
- Updated pricing rule

**Example:**
```javascript
await updatePricingRule(ruleId, {
  base_price: 12.00,
  price_per_kg: 2.50
});
```

---

## Quote Service

Location: `src/services/quoteService.js`

### submitQuoteRequest(quoteData)

Submits a new quote request.

**Parameters:**
- `quoteData` (object):
  - `customer_name` (string, required)
  - `customer_email` (string, required)
  - `customer_phone` (string, optional)
  - `origin_address` (string, required)
  - `destination_address` (string, required)
  - `weight` (number, optional)
  - `dimensions` (object, optional)
  - `service_level` (string, optional)
  - `description` (string, optional)

**Returns:** `Promise<Object>`
- `{ success: boolean, quoteId: string, quote: object }`

**Example:**
```javascript
const result = await submitQuoteRequest({
  customer_name: 'John Doe',
  customer_email: 'john@example.com',
  origin_address: 'New York, NY',
  destination_address: 'Los Angeles, CA',
  weight: 25,
  description: 'Fragile electronics'
});

console.log(`Quote ID: ${result.quoteId}`);
```

### getQuoteById(quoteId)

Retrieves a quote by ID.

**Parameters:**
- `quoteId` (string): Quote UUID

**Returns:** `Promise<Object|null>`

### getQuotesByEmail(email)

Retrieves all quotes for a customer email.

**Parameters:**
- `email` (string): Customer email address

**Returns:** `Promise<Array>`

### updateQuoteStatus(quoteId, status, quotedPrice)

Updates quote status (Admin function).

**Parameters:**
- `quoteId` (string): Quote UUID
- `status` (string): New status ('pending', 'quoted', 'accepted', 'rejected')
- `quotedPrice` (number, optional): Quoted price

**Returns:** `Promise<boolean>`

---

## Contact Service

Location: `src/services/contactService.js`

### submitContactForm(contactData)

Submits a contact form.

**Parameters:**
- `contactData` (object):
  - `name` (string, required)
  - `email` (string, required)
  - `phone` (string, optional)
  - `subject` (string, optional)
  - `message` (string, required)

**Returns:** `Promise<Object>`
- `{ success: boolean, contactId: string, contact: object }`

**Example:**
```javascript
const result = await submitContactForm({
  name: 'Jane Smith',
  email: 'jane@example.com',
  subject: 'Shipping Question',
  message: 'Do you ship internationally?'
});
```

### getAllContacts(filters)

Retrieves all contact submissions (Admin function).

**Parameters:**
- `filters` (object, optional):
  - `status` (string): Filter by status
  - `email` (string): Filter by email
  - `name` (string): Filter by name
  - `from_date` (string): Start date
  - `to_date` (string): End date
  - `limit` (number): Max results
  - `offset` (number): Pagination offset

**Returns:** `Promise<Array>`

### updateContactStatus(contactId, status)

Updates contact status (Admin function).

**Parameters:**
- `contactId` (string): Contact UUID
- `status` (string): New status ('new', 'in_progress', 'resolved')

**Returns:** `Promise<boolean>`

---

## Error Handling

All service functions follow consistent error handling:

### Error Response Format

```javascript
try {
  const result = await someServiceFunction();
} catch (error) {
  // error.message contains user-friendly error message
  console.error(error.message);
}
```

### Common Error Types

1. **Validation Errors**: Invalid input data
2. **Not Found**: Resource doesn't exist (returns null, not error)
3. **Database Errors**: Supabase/PostgreSQL errors
4. **Network Errors**: Connection issues

### Using with Toast Notifications

```javascript
import { useToast } from '../contexts/ToastContext';

const { showSuccess, showError } = useToast();

try {
  await submitQuoteRequest(data);
  showSuccess('Quote request submitted successfully!');
} catch (error) {
  showError(error.message || 'Failed to submit quote request');
}
```

---

## Data Models

### Shipment

```typescript
interface Shipment {
  id: string;
  tracking_number: string;
  sender_name: string;
  sender_address: string;
  sender_phone?: string;
  sender_email?: string;
  recipient_name: string;
  recipient_address: string;
  recipient_phone?: string;
  recipient_email?: string;
  weight: number;
  dimensions?: { length: number; width: number; height: number };
  service_level: 'standard' | 'express' | 'overnight';
  current_status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
  current_location?: string;
  estimated_delivery?: string;
  actual_delivery?: string;
  cost?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}
```

### ShipmentStatus

```typescript
interface ShipmentStatus {
  id: string;
  shipment_id: string;
  status: string;
  location?: string;
  notes?: string;
  timestamp: string;
}
```

### Quote

```typescript
interface Quote {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  origin_address: string;
  destination_address: string;
  weight?: number;
  dimensions?: object;
  service_level?: string;
  description?: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  quoted_price?: number;
  quoted_at?: string;
  created_at: string;
}
```

### Contact

```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
}
```

### PricingRule

```typescript
interface PricingRule {
  id: string;
  service_level: string;
  base_price: number;
  price_per_kg: number;
  price_per_km?: number;
  min_price?: number;
  max_weight?: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}
```

---

## Best Practices

### 1. Always Handle Errors

```javascript
try {
  const result = await serviceFunction();
  // Handle success
} catch (error) {
  // Handle error
  console.error(error);
}
```

### 2. Validate Input Before Calling Services

```javascript
import { validateWeight, validateAddress } from '../utils/validators';

const weightCheck = validateWeight(formData.weight);
if (!weightCheck.valid) {
  setError(weightCheck.error);
  return;
}

await createShipment(formData);
```

### 3. Use Real-time Subscriptions Wisely

```javascript
useEffect(() => {
  if (!trackingNumber) return;
  
  const channel = subscribeToShipment(trackingNumber, handleUpdate);
  
  return () => {
    unsubscribeFromShipment(channel); // Always cleanup
  };
}, [trackingNumber]);
```

### 4. Implement Retry Logic for Critical Operations

```javascript
import { retryWithBackoff } from '../utils/retryHelper';

const result = await retryWithBackoff(
  async () => await updateShipmentStatus(id, status),
  3 // max retries
);
```

### 5. Use Loading States

```javascript
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await submitQuoteRequest(data);
  } finally {
    setLoading(false);
  }
};
```

---

## Rate Limits

Supabase free tier limits:
- Unlimited API requests
- 500 MB database storage
- 1 GB file storage
- 2 GB bandwidth per month

For production, consider upgrading to Pro tier for:
- Higher storage limits
- Better performance
- Priority support

---

## Support

For issues or questions:
- Check error messages in browser console
- Review Supabase logs in dashboard
- Refer to [Supabase Documentation](https://supabase.com/docs)
- Contact support: support@gocourier.com
