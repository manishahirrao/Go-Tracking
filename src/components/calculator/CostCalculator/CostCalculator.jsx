import { useState, useEffect } from 'react';
import { calculateShippingCost } from '../../../services/pricingService';
import { validatePositiveNumber, validateLocation } from '../../../utils/validators';
import Button from '../../common/Button/Button';
import './CostCalculator.css';

const CostCalculator = () => {
  const [formData, setFormData] = useState({
    height: '',
    width: '',
    depth: '',
    weight: '',
    from: '',
    to: '',
    deliverySpeed: '', // Will be set after loading options
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pricingOptions, setPricingOptions] = useState([]);

  // Load all pricing options on mount
  useEffect(() => {
    const loadPricingOptions = async () => {
      try {
        // Calculate for all three service levels
        const serviceLevels = ['standard', 'express', 'overnight'];
        const options = await Promise.all(
          serviceLevels.map(level =>
            calculateShippingCost({
              weight: 1,
              origin: 'New York',
              destination: 'Los Angeles',
              service_level: level
            })
          )
        );
        
        // Flatten the results (each call returns an array with one item)
        const flatOptions = options.flat();
        setPricingOptions(flatOptions);
        
        // Set default service level
        if (flatOptions.length > 0 && !formData.deliverySpeed) {
          setFormData(prev => ({ ...prev, deliverySpeed: flatOptions[0].service_level }));
        }
      } catch (error) {
        console.error('Error loading pricing options:', error);
        // Set default options if loading fails
        setPricingOptions([
          { service_level: 'standard' },
          { service_level: 'express' },
          { service_level: 'overnight' }
        ]);
        setFormData(prev => ({ ...prev, deliverySpeed: 'standard' }));
      }
    };
    loadPricingOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    // Clear result when user changes input
    if (result) {
      setResult(null);
    }
  };

  const handleDeliverySpeedChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, deliverySpeed: value }));

    // Clear result when user changes service level
    if (result) {
      setResult(null);
    }
  };

  const isFormValid = (data = formData) => {
    const newErrors = {};

    if (!validatePositiveNumber(data.height)) {
      newErrors.height = 'Height must be a positive number';
    }

    if (!validatePositiveNumber(data.width)) {
      newErrors.width = 'Width must be a positive number';
    }

    if (!validatePositiveNumber(data.depth)) {
      newErrors.depth = 'Depth must be a positive number';
    }

    if (!validatePositiveNumber(data.weight)) {
      newErrors.weight = 'Weight must be a positive number';
    }

    if (!validateLocation(data.from)) {
      newErrors.from = 'Origin location is required';
    }

    if (!validateLocation(data.to)) {
      newErrors.to = 'Destination location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCost = async (data = formData) => {
    if (!isFormValid(data)) {
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const costResults = await calculateShippingCost({
        weight: parseFloat(data.weight),
        dimensions: {
          length: parseFloat(data.height),
          width: parseFloat(data.width),
          height: parseFloat(data.depth)
        },
        origin: data.from,
        destination: data.to,
        service_level: data.deliverySpeed
      });

      // Get the result for the selected service level
      const selectedResult = costResults.find(r => r.service_level === data.deliverySpeed) || costResults[0];
      setResult(selectedResult);
    } catch (error) {
      console.error('Error calculating cost:', error);
      setErrors({ submit: error.message || 'Failed to calculate shipping cost' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateCost();
  };

  return (
    <div className="cost-calculator">
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
              className="form-control"
            />
            {errors.height && <span className="error-message">{errors.height}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="width">Width (cm)</label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
              className="form-control"
            />
            {errors.width && <span className="error-message">{errors.width}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="depth">Depth (cm)</label>
            <input
              type="number"
              id="depth"
              name="depth"
              value={formData.depth}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
              className="form-control"
            />
            {errors.depth && <span className="error-message">{errors.depth}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="0"
              min="0"
              step="0.1"
              className="form-control"
            />
            {errors.weight && <span className="error-message">{errors.weight}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
              placeholder="Origin city"
              className="form-control"
            />
            {errors.from && <span className="error-message">{errors.from}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleInputChange}
              placeholder="Destination city"
              className="form-control"
            />
            {errors.to && <span className="error-message">{errors.to}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="deliverySpeed">Delivery Speed</label>
          <select
            id="deliverySpeed"
            name="deliverySpeed"
            value={formData.deliverySpeed}
            onChange={handleDeliverySpeedChange}
            className="form-control"
            disabled={pricingOptions.length === 0}
          >
            {pricingOptions.length === 0 ? (
              <option value="">Loading options...</option>
            ) : (
              pricingOptions.map((option) => (
                <option key={option.service_level} value={option.service_level}>
                  {option.service_level.charAt(0).toUpperCase() + option.service_level.slice(1)}
                </option>
              ))
            )}
          </select>
        </div>

        {errors.submit && (
          <div className="error-message" style={{ marginBottom: '1rem', color: '#dc2626' }}>
            {errors.submit}
          </div>
        )}

        <Button type="submit" variant="primary" className="calculate-btn" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Shipping Cost'}
        </Button>
      </form>

      {result && (
        <div className="cost-result">
          <h3>Cost Breakdown</h3>
          <div className="result-details">
            <div className="result-row">
              <span className="result-label">Service Level:</span>
              <span className="result-value">
                {result.service_level.charAt(0).toUpperCase() + result.service_level.slice(1)}
              </span>
            </div>
            <div className="result-row">
              <span className="result-label">Base Price:</span>
              <span className="result-value">${result.base_price.toFixed(2)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Weight Charge ({result.weight_kg} kg):</span>
              <span className="result-value">${result.weight_charge.toFixed(2)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Distance Charge ({result.distance_km} km):</span>
              <span className="result-value">${result.distance_charge.toFixed(2)}</span>
            </div>
            <div className="result-row total">
              <span className="result-label">Total Cost:</span>
              <span className="result-value">${result.total_cost.toFixed(2)}</span>
            </div>
            <div className="result-info">
              <p className="result-note">
                Prices are calculated based on current rates and may vary.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
