import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllGroceryOrders, searchGroceryOrders, deleteKutirOrder } from "../../Api";
import "./groceryorders.css";
import Spinner from "../loader";

const UserTable = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page = 1) => {
        try {
            setLoading(true);
            const response = await getAllGroceryOrders(page);
            setOrders(response.orders);
            setTotalPages(response.totalPages);
            setCurrentPage(page);
            setTotalOrders(response.totalOrders);
        } catch (error) {
            setError("Error fetching orders");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await deleteKutirOrder(id);
            fetchData(currentPage); // Refresh current page after deletion
        } catch (err) {
            alert('Failed to delete order');
        } finally {
            setLoading(false);
            setDeleteConfirm(null);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            fetchData();
            return;
        }
        try {
            setLoading(true);
            const response = await searchGroceryOrders(searchQuery);
            setOrders(response.orders);
            setTotalPages(response.totalPages);
            setCurrentPage(1);
        } catch (error) {
            setError("Error searching orders");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        fetchData(newPage);
    };

    const generatePageNumbers = () => {
        let pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        } else if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - 4, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    useEffect(() => {
        fetchData(1);
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spinner />
            </div>
        );
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    return (
        <div className="grocery-table-container" id='grocery-order-table'>
            {error && <div className="error-message">{error}</div>}
            <div className="search-container">
                <form className="search-form" onSubmit={handleSearch}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Grocery Orders..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            {orders.length === 0 ? (
                <div className="no-users-message">No orders available</div>
            ) : (
                <table className="grocery-order-table">
                    <thead>
                        <tr className='table-header'>
                            <th>Customer Name</th>
                            <th>Customer Number</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td data-label="Customer Name">
                                        {order.customer?.name || 'N/A'}
                                    </td>
                                    <td data-label="Customer Number">
                                        {order.customer?.phone || 'N/A'}
                                    </td>
                                    <td data-label="Date">{formatDate(order.createdAt)}</td>
                                    <td data-label="Items">
                                        {order.orderItems.length || '0'}
                                    </td>
                                    <td data-label="Total Amount">
                                        {order.totalAmount || 0}
                                    </td>
                                    <td data-label="Status">
                                        <span className={`status-${order.status}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td data-label="Options">
                                        <div>
                                            <Link
                                                to={`/groceryorders/${order._id}`}
                                                className="details-button"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => setDeleteConfirm(order._id)}
                                                className='deleteUser'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}


            <div className="grocery-pagination-bar flex flex-col md:flex-row justify-between items-center">
                <div className="grocery-pagination-bar-information">
                    {
                        totalOrders > 0 && (
                            <p>Total Orders:- {totalOrders}</p>
                        )
                    }
                </div>
                <div className="pagination-container">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        First
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {generatePageNumbers().map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? 'active-page' : ''}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        Last
                    </button>
                </div>
            </div>



            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this order? This action cannot be undone.</p>
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