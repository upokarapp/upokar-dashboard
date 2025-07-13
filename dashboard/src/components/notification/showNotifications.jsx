import React, { useState, useEffect } from 'react';
import { getAllNotification, deleteNotification } from "../../Api"
import { Link } from 'react-router-dom';
import Spinner from "../loader"
import './showNotification.css';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllNotification();
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
    const handelDelete = async (data) => {
        try {
            await deleteNotification(data);
            setDeleteConfirm(null);
            fetchData()
        } catch (err) {
            alert("Failed to delete Notification");
            setDeleteConfirm(null);
            setLoading(false);
        }

    }
    const filteredOrders = orders.filter(order => {
        return Object.keys(order).some(key => {
            if (key === "_id") return false;
            const value = order[key];
            return value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    if (loading) return <Spinner />;
    if (error) return <div className="error">Error: {error}</div>;

    const dd_mm_yyyy = (date) => {
        const d = new Date(date);
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    }
    return (
        <div id='notification-table'>
            <div className="order-table-container" >
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search Notification..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div>
                        <Link to='/addNotification' className="btn primary">Add </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Title</div>
                        <div>Description</div>
                        <div>Date</div>
                        <div>Option</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="no-results">No Notification found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Title">{order.title}</div>
                                <div data-label="Description">{order.discription}</div>
                                <div data-label="Date">{dd_mm_yyyy(order.createdAt)}</div>
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
                        <p>Are you sure you want to delete this Notification? This action cannot be undone.</p>
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
                                Delete Notification
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;