import React, { useState, useEffect } from 'react';
import { getAllOrders, searchOrders, deleteOrder } from "../../Api";
import "./showorders.css";
import Spinner from "../loader"; // Assuming you already have a spinner component

const UserTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state to handle fetch errors
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        try {
            const response = await getAllOrders();
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
            await deleteOrder(id);
            fetchData();
            alert('User deleted successfully!');
            setLoading(false);
        } catch (err) {
            alert('Failed to delete user');
            setLoading(false);
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
            const response = await searchOrders(searchQuery);
            console.log(response);
            setOrders(response);
            setLoading(false);
        } catch (error) {

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
        <div className="table-container" id='user-table'>
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
                <table className="user-table">
                    <thead>
                        <tr className='table-header'>
                            <th>Customer Name</th>
                            <th>Customer Number</th>
                            <th>Delivery Address</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Seller Name</th>
                            <th>Seller Number</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td data-label="Customer Name">{order.customerName}</td>
                                <td data-label="Customer Number">{order.customerNumber}</td>
                                <td data-label="Delivery Address">{order.deliveryAddress}</td>
                                <td data-label="Product Name">{order.productName}</td>
                                <td data-label="Product Price">{order.productPrice}</td>
                                <td data-label="Quantity">{order.quantity}</td>
                                <td data-label="Total Price">{order.totalPrice}</td>
                                <td data-label="Seller Name">{order.sellerName}</td>
                                <td data-label="Seller Number">{order.sellerNumber}</td>
                                <td data-label="Options">
                                    <button onClick={() => handleDelete(order._id)} className='deleteUser'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserTable;
