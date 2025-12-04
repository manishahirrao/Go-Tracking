import { useState } from 'react';
import { calculateShippingCost, DELIVERY_OPTIONS } from '../../../services/calculatorService';
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
    deliverySpeed: 'standard',
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

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

    // Real-time calculation if all fields are valid
    if (name !== 'deliverySpeed') {
      const updatedData = { ...formData, [name]: value };
      if (isFormValid(updatedData)) {
        calculateCost(updatedData);
      }
    }
  };

  const handleDeliverySpeedChange = (e) => {
    const { value } = e.target;
    const updatedData = { ...formData, deliverySpeed: value };
    setFormData(updatedData);

    // Recalculate if form is valid
    if (isFormValid(updatedData)) {
      calculateCost(updatedData);
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

  const calculateCost = (data = formData) => {
    if (!isFormValid(data)) {
      return;
    }

    const costResult = calculateShippingCost({
      height: parseFloat(data.height),
      width: parseFloat(data.width),
      depth: parseFloat(data.depth),
      weight: parseFloat(data.weight),
      from: data.from,
      to: data.to,
      deliverySpeed: data.deliverySpeed,
    });

    setResult(costResult);
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
          >
            {Object.values(DELIVERY_OPTIONS).map((option) => (
              <option key={option.type} value={option.type}>
                {option.name} ({option.estimatedDays} days)
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="primary" className="calculate-btn">
          Calculate Shipping Cost
        </Button>
      </form>

      {result && (
        <div className="cost-result">
          <h3>Cost Breakdown</h3>
          <div className="result-details">
            <div className="result-row">
              <span className="result-label">Base Cost:</span>
              <span className="result-value">${result.baseCost.toFixed(2)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Speed Surcharge:</span>
              <span className="result-value">${result.speedSurcharge.toFixed(2)}</span>
            </div>
            <div className="result-row">
              <span className="result-label">Discount:</span>
              <span className="result-value discount">-${result.discount.toFixed(2)}</span>
            </div>
            <div className="result-row total">
              <span className="result-label">Total Cost:</span>
              <span className="result-value">${result.total.toFixed(2)}</span>
            </div>
            <div className="result-info">
              <p>Estimated delivery: {result.estimatedDays} day(s)</p>
              <p className="result-note">
                Dimensional weight: {result.breakdown.dimensionalWeight} kg
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
