import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './showTransportTable.css';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get('https://api.example.com/orders');
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Simulating API call with static data
        setTimeout(() => {
            setOrders([{
                name: "shahid",
                phone: "01779481759",
                pickup: "lll",
                destination: "LULLABY ",
                date: "tty",
                time: "ygggg",
                truckType: "ভারি ট্রাক",
                loadWeight: "5585",
                specialRequest: "ggggghgg",
            }]);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredOrders = orders.filter(order => {
        return Object.values(order).some(value =>
            value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div id='trnasport-table'>
            <div className="order-table-container" >
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Name</div>
                        <div>Phone</div>
                        <div>Pickup</div>
                        <div>Destination</div>
                        <div>Date</div>
                        <div>Time</div>
                        <div>Truck Type</div>
                        <div>Load Weight</div>
                        <div>Special Request</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="no-results">No orders found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Name">{order.name}</div>
                                <div data-label="Phone">{order.phone}</div>
                                <div data-label="Pickup">{order.pickup}</div>
                                <div data-label="Destination">{order.destination}</div>
                                <div data-label="Date">{order.date}</div>
                                <div data-label="Time">{order.time}</div>
                                <div data-label="Truck Type">{order.truckType}</div>
                                <div data-label="Load Weight">{order.loadWeight}</div>
                                <div data-label="Special Request">{order.specialRequest}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderTable;