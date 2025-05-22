import React, { useState } from 'react';
import { setGasPrice } from "../Api";
import './GasPrice.css';

const GasPriceForm = () => {
  const companies = ['Omera', 'Total', 'Beximco', 'Jamuna', 'Aygaz', 'Petromax'];
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Basic client-side validation
    for (let company of companies) {
      const value = prices[company];
      if (value === undefined || value === '' || isNaN(value) || Number(value) <= 0) {
        setError(`Please enter a valid positive price for ${company}.`);
        setLoading(false);
        return;
      }
    }

    try {
      await setGasPrice(prices);
      setSuccess('Prices updated successfully!');
    } catch (err) {
      console.error('Error updating prices:', err);
      // If API returns message
      const message = err.response?.data?.message || err.message || 'An unexpected error occurred.';
      setError(`Failed to update prices: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (company, value) => {
    setPrices(prev => ({
      ...prev,
      [company]: value
    }));
  };

  return (
    <div className="price-form-container">
      <h2 className="form-title">Set Cylinder Price</h2>
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="input-group">
          {companies.map((company, index) => (
            <div className="form-row" key={index}>
              <label className="company-label" htmlFor={company.toLowerCase()}>{company}</label>
              <input
                type="number"
                id={company.toLowerCase()}
                className="price-input"
                value={prices[company] || ''}
                onChange={(e) => handlePriceChange(company, e.target.value)}
                placeholder="Enter price"
                required
                min="1"
                step="0.01"
              />
              <span className="currency">BDT</span>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Updating Prices...' : 'Update Prices'}
        </button>
      </form>
    </div>
  );
};

export default GasPriceForm;
