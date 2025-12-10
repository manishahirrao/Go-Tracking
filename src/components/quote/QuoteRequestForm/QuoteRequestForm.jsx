import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';

const QuoteRequestForm = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    origin_address: '',
    destination_address: '',
    weight: '',
    service_level: 'standard',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Mock quote submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockQuoteId = 'QT-' + Date.now();
      setSuccess(true);
      setQuoteId(mockQuoteId);
      // Reset form
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        origin_address: '',
        destination_address: '',
        weight: '',
        service_level: 'standard',
        description: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to submit quote request');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-green">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-16 w-16 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green mb-2">Quote Request Submitted!</h3>
          <p className="text-gray mb-4">
            Your quote request has been received. We'll get back to you within 24 hours.
          </p>
          <div className="bg-light-gray p-4 rounded mb-6">
            <p className="text-sm text-gray mb-1">Your Quote ID:</p>
            <p className="font-mono font-bold text-lg text-primary">{quoteId}</p>
          </div>
          <Button onClick={() => setSuccess(false)} variant="primary">
            Submit Another Quote Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Name */}
        <div>
          <label htmlFor="customer_name" className="block text-sm font-semibold mb-2 text-black">
            Full Name *
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Customer Email */}
        <div>
          <label htmlFor="customer_email" className="block text-sm font-semibold mb-2 text-black">
            Email Address *
          </label>
          <input
            type="email"
            id="customer_email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="john@example.com"
          />
        </div>

        {/* Customer Phone */}
        <div>
          <label htmlFor="customer_phone" className="block text-sm font-semibold mb-2 text-black">
            Phone Number
          </label>
          <input
            type="tel"
            id="customer_phone"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-semibold mb-2 text-black">
            Package Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            step="0.1"
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="5.0"
          />
        </div>

        {/* Origin Address */}
        <div className="md:col-span-2">
          <label htmlFor="origin_address" className="block text-sm font-semibold mb-2 text-black">
            Origin Address *
          </label>
          <input
            type="text"
            id="origin_address"
            name="origin_address"
            value={formData.origin_address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="123 Main St, New York, NY 10001"
          />
        </div>

        {/* Destination Address */}
        <div className="md:col-span-2">
          <label htmlFor="destination_address" className="block text-sm font-semibold mb-2 text-black">
            Destination Address *
          </label>
          <input
            type="text"
            id="destination_address"
            name="destination_address"
            value={formData.destination_address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="456 Oak Ave, Los Angeles, CA 90001"
          />
        </div>

        {/* Service Level */}
        <div>
          <label htmlFor="service_level" className="block text-sm font-semibold mb-2 text-black">
            Service Level
          </label>
          <select
            id="service_level"
            name="service_level"
            value={formData.service_level}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="standard">Standard (5-7 days)</option>
            <option value="express">Express (2-3 days)</option>
            <option value="overnight">Overnight (1 day)</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-semibold mb-2 text-black">
            Additional Details
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Any special requirements or additional information..."
          />
        </div>
      </div>

      {error && (
        <div className="mt-6 bg-red/10 border-l-4 border-red p-4 rounded">
          <p className="text-sm text-red font-medium">{error}</p>
        </div>
      )}

      <div className="mt-8">
        <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full">
          {loading ? 'Submitting...' : 'Request Quote'}
        </Button>
      </div>

      <p className="mt-4 text-xs text-gray text-center">
        * Required fields. We'll respond to your quote request within 24 hours.
      </p>
    </form>
  );
};

QuoteRequestForm.propTypes = {};

export default QuoteRequestForm;
