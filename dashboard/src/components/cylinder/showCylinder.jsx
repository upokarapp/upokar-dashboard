import React, { useState, useEffect } from 'react';
import { getCylinderOrder, deleteCylinderOrder } from "../../Api"
import Spinner from "../loader"
import './showCylinder.css';
import { Link } from 'react-router-dom';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getCylinderOrder();
            setOrders(response);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    const handelDelete = async (id) => {
        try {
            await deleteCylinderOrder(id);
            setDeleteConfirm(null);
            fetchData()
        } catch (err) {
            alert("Failed to delete Order");
            setDeleteConfirm(null);
            setLoading(false);
        }

    }
    const filteredOrders = orders.filter(order => {
        return Object.values(order).some(value =>
            value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <Spinner />;
    if (error) return <div className="error">Error: {error}</div>;


    return (
        <div id='cylinder-table'>
            <div className="order-table-container" >
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div>
                        <Link to='/addGasPrice' className="btn primary">Add </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Name</div>
                        <div>Phone</div>
                        <div>Address</div>
                        <div>Cylinder</div>
                        <div>Date</div>
                        <div>Quantity</div>
                        <div>Request</div>
                        <div>Option</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="no-results">No orders found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Name">{order.name}</div>
                                <div data-label="Phone">{order.phone}</div>
                                <div data-label="Address">{order.address}</div>
                                <div data-label="Cylinder">{order.cname}</div>
                                <div data-label="Date">{order.date}</div>
                                <div data-label="Quantity">{order.quantity}</div>
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
                                Delete Cylinder
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;