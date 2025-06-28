import React, { useState, useEffect } from 'react';
import { getAllBusOrder, deleteBusOrder } from '../../Api';
import './showTransportTable.css';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllBusOrder();
            setOrders(response);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }
    const handelDelete = async (id) => {        
        try {
            await deleteBusOrder(id);
            setDeleteConfirm(null);
            fetchData()
        } catch (err) {
            alert("Failed to delete Order");
            setDeleteConfirm(null);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
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
            <div className="order-table-container">
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
                        <div>Bus Type</div>
                        <div>Passengers</div>
                        <div>Request</div>
                        <div>Delete</div>
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
                                <div data-label="Bus Type">{order.busType}</div>
                                <div data-label="Passengers">{order.passengers}</div>
                                <div data-label="Special Request">{order.specialRequest}</div>
                                <div data-label="Delete"> <span onClick={() => setDeleteConfirm(order._id)} className='deleteUser'>Delete</span></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this Order? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button
                                className="btn secondary"
                                onClick={() => setDeleteConfirm(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn danger"
                                onClick={() => handelDelete(deleteConfirm)}
                            >
                                Delete Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;