import React, { useState } from 'react';
import { setGasPrice } from "../Api";
import './GasPrice.css';

const GasPriceForm = () => {
    const companies = ['Omera', 'Total', 'Beximco', 'Jamuna'];
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(false); // state to manage loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading to true when API is called

        try {
            await setGasPrice(prices); // Call your API method
            alert('Prices updated successfully');
        } catch (error) {
            alert('Error updating prices:', error);
        } finally {
            setLoading(false); // Set loading to false after API call completes
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
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    {companies.map((company, index) => (
                        <div className="form-row" key={index}>
                            <label className="company-label">{company}</label>
                            <input
                                type="number"
                                className="price-input"
                                value={prices[company] || ''}
                                onChange={(e) => handlePriceChange(company, e.target.value)}
                                placeholder="Enter price"
                                required
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
