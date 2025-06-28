import React, { useState, useEffect } from 'react';
import { getAllKutirOrders, searchKutirOrders, deleteKutirOrder } from "../../Api";
import "./kutirorders.css";
import Spinner from "../loader"; // Assuming you already have a spinner component

const UserTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state to handle fetch errors
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllKutirOrders();
            setOrders(response);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteKutirOrder(id);
            fetchData();
            setLoading(false);
        } catch (err) {
            alert('Failed to delete user');
            setLoading(false);
            setDeleteConfirm(null);
        } finally {
            setDeleteConfirm(null); // Close the confirmation modal after deletion
        }

    }
    const handleSearch = async (e) => {
        e.preventDefault();
        // If search query is empty, fetch all products
        if (!searchQuery.trim()) {
            fetchData();
            return;
        }
        setLoading(true);
        try {
            const response = await searchKutirOrders(searchQuery);
            setOrders(response);
            setLoading(false);
        } catch (error) {
            setError("Error searching products");
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner /> {/* Show spinner while loading */}
            </div>
        );
    }

    return (
        <div className="GO-table-container" id='gift-order-table'>
            {error && <div className="error-message">{error}</div>} {/* Show error message if there's an issue fetching */}
            {!error &&
                <div className="search-container">
                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            }
            {orders.length === 0 ? (
                <div className="no-users-message">There are no Order available.</div> // Display when no users are found
            ) : (
                <table className="gift-order-table">
                    <thead>
                        <tr className='table-header'>
                            <th>Customer Name</th>
                            <th>Customer Number</th>
                            <th>Delivery Address</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Requist</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td data-label="Customer Name">{order.name}</td>
                                <td data-label="Customer Number">{order.number}</td>
                                <td data-label="Delivery Address">{order.address}</td>
                                <td data-label="Product Name">{order.pname}</td>
                                <td data-label="Product Price">{order.pprice}</td>
                                <td data-label="Quantity">{order.quantity}</td>
                                <td data-label="Total Price">{order.totalPrice}</td>
                                <td data-label="Request">{order.specialRequest}</td>
                                <td data-label="Options">
                                    <button onClick={() => setDeleteConfirm(order._id)} className='deleteUser'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
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
                                onClick={() => handleDelete(deleteConfirm)}
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

export default UserTable;
