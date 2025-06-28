import React, { useEffect, useState } from 'react';
import { getTotalCounts } from "../../Api";
import './Graph.css';

const ColumnChart = () => {
    const [data, setData] = useState({
        totalUsers: 100,
        totalProducts: 100,
        totalOrders: 100,
        totalAdmins: 100
    });

    const chartData = [
        { label: 'Customers', value: data.totalUsers, color: '#0d6efd' },
        { label: 'Products', value: data.totalProducts, color: '#198754' },
        { label: 'Orders', value: data.totalOrders, color: '#f3b805' },
        { label: 'Admins', value: data.totalAdmins, color: '#dc3545' },
    ];

    // Find max value for scaling
    const maxValue = Math.max(...chartData.map(item => item.value), 10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTotalCounts();
                if (response) {
                    setData({
                        totalUsers: response.totalUsers,
                        totalProducts: response.totalProducts,
                        totalOrders: response.totalOrders,
                        totalAdmins: response.totalAdmins
                    });
                }
            } catch (apiError) {
                console.error("Error fetching total counts:", apiError);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="column-chart-container-modern">
            <div className="column-chart-header-modern">
                <h3 className="column-chart-title-modern">System Overview</h3>
                <div className="column-chart-total-modern">
                    <span className="column-chart-total-label-modern">Total:</span>
                    <span className="column-chart-total-value-modern">
                        {chartData.reduce((sum, item) => sum + item.value, 0)}
                    </span>
                </div>
            </div>

            <div className="column-chart-bars-modern">
                {chartData.map((item, index) => (
                    <div key={index} className="column-chart-bar-container-modern">
                        <div className="column-chart-bar-modern">
                            <div
                                className="column-chart-bar-fill-modern"
                                style={{
                                    height: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: item.color
                                }}
                            >
                                <span className="column-chart-bar-value-modern">{item.value}</span>
                            </div>
                        </div>
                        <div className="column-chart-bar-label-modern">{item.label}</div>
                    </div>
                ))}
            </div>

            <div className="doughnut-chart-legend-modern">
                {chartData.map((item, index) => (
                    <div key={index} className="doughnut-chart-legend-item-modern">
                        <span
                            className="doughnut-chart-legend-color-modern"
                            style={{ backgroundColor: item.color }}
                        />
                        <div className="doughnut-chart-legend-info-modern">
                            <span className="doughnut-chart-legend-label-modern">{item.label}</span>
                            <span className="doughnut-chart-legend-value-modern">{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColumnChart;