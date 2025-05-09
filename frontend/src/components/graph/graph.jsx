import React, { useEffect, useState } from 'react';
import {getTotalCounts} from "../../Api"
import './Graph.css';

const DoughnutChart = () => {
    const [data,setData]=useState({ totalUsers: 100, totalProducts: 100, totalOrders: 100, totalAdmins: 100 })
    // const data = 
    const chartData = [
        { label: 'Customers', value: data.totalUsers, color: '#0d6efd' },
        { label: 'Products', value: data.totalProducts, color: '#198754' },
        { label: 'Orders', value: data.totalOrders, color: '#f3b805' },
        { label: 'Admins', value: data.totalAdmins, color: '#dc3545' },
    ];

    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    let accumulatedAngle = -90;

    const calculateSegment = (value) => {
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 360;
        const startAngle = accumulatedAngle;
        accumulatedAngle += angle;
        return { startAngle, angle, percentage };
    };

    const getArcPath = (startAngle, angle, innerRadius = 70, outerRadius = 100) => {
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = ((startAngle + angle) * Math.PI) / 180;

        const x1 = Math.cos(startRad) * outerRadius;
        const y1 = Math.sin(startRad) * outerRadius;
        const x2 = Math.cos(endRad) * outerRadius;
        const y2 = Math.sin(endRad) * outerRadius;

        const largeArc = angle > 180 ? 1 : 0;

        return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${Math.cos(endRad) * innerRadius} ${Math.sin(endRad) * innerRadius}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${Math.cos(startRad) * innerRadius} ${Math.sin(startRad) * innerRadius}
      Z
    `;
    };

    const getPercentagePosition = (startAngle, angle) => {
        const midAngle = startAngle + angle / 2;
        const rad = (midAngle * Math.PI) / 180;
        const radius = 85; // Position between inner and outer radius
        return {
            x: Math.cos(rad) * radius,
            y: Math.sin(rad) * radius,
            rotation: midAngle + 90 // Add 90 to make text upright
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTotalCounts();
                if (response) {
                    setData({
                        totalUsers: response.totalUsers, totalProducts: response.totalProducts, totalOrders: response.totalOrders, totalAdmins: response.totalAdmins
                    });
                }
            } catch (apiError) {
                console.error("Error fetching total counts:", apiError);
                // If API call fails, defaultTotalCounts will be used anyway as initial state
            }
        };
        fetchData();
    }, []);
    return (
        <div className="doughnut-chart-container-modern">
            <svg
                className="doughnut-chart-svg-modern"
                viewBox="-110 -110 220 220"
            >
                <defs>
                    <filter id="doughnut-shadow-modern" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.2)" />
                    </filter>
                </defs>

                {chartData.map((item, index) => {
                    const { startAngle, angle, percentage } = calculateSegment(item.value);
                    const pos = getPercentagePosition(startAngle, angle);

                    return (
                        <g key={index}>
                            <path
                                d={getArcPath(startAngle, angle)}
                                fill={item.color}
                                className="doughnut-chart-segment-modern"
                                filter="url(#doughnut-shadow-modern)"
                            />
                            <text
                                x={pos.x}
                                y={pos.y}
                                transform={`rotate(${pos.rotation} ${pos.x} ${pos.y})`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="doughnut-chart-percentage-modern"
                            >
                                {percentage.toFixed(1)}%
                            </text>
                        </g>
                    );
                })}

                <circle cx="0" cy="0" r="60" fill="white" />
                <g className="doughnut-chart-center-group-modern">
                    <text className="doughnut-chart-center-total-modern">{total}</text>
                    <text className="doughnut-chart-center-label-modern" dy="2em">Total</text>
                </g>
            </svg>

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

export default DoughnutChart;