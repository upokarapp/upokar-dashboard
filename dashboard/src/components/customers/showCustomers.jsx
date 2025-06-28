import React, { useState, useEffect } from 'react';
import { getAllCustomer, deleteUser, searchCustomer } from "../../Api";
import "./showCustomers.css";
import Spinner from "../loader"; // Assuming you already have a spinner component

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state to handle fetch errors
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = async (page = currentPage) => {
        setLoading(true);
        try {
            const response = await getAllCustomer(page, itemsPerPage);

            // Assuming the API returns an object with users array and pagination info
            // If the API returns just an array, we'll handle that case too
            if (response && typeof response === 'object' && response.users) {
                setUsers(response.users);
                setTotalItems(response.totalItems || 0);
                setTotalPages(response.totalPages || Math.ceil((response.totalItems || 0) / itemsPerPage));
            } else {
                // If API returns just an array (current behavior), treat it as first page
                setUsers(response || []);
                setTotalItems(response?.length || 0);
                setTotalPages(1);
            }
            setError(null);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteUser(id);
            fetchData(currentPage);
            alert('User deleted successfully!');
        } catch (error) {
            alert('Failed to delete user');
        } finally {
            setLoading(false);
            setDeleteConfirm(null); // Close the confirmation modal
        }
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        // If search query is empty, fetch all customers
        if (!searchQuery.trim()) {
            setCurrentPage(1);
            fetchData(1);
            return;
        }
        setLoading(true);
        try {
            const response = await searchCustomer(searchQuery);
            setUsers(response);
            // Reset pagination for search results
            setCurrentPage(1);
            setTotalItems(response?.length || 0);
            setTotalPages(1);
        } catch (err) {
            setError("Error searching customers");
        } finally {
            setLoading(false);
        }
    }

    // Pagination functions
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            fetchData(page);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    useEffect(() => {
        fetchData(1);
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
                                placeholder="Search customers..."
                                className="search-input"
                            />
                            <button type="submit" className="search-button">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            }
            {users.length === 0 ? (
                <div className="no-users-message">There are no users available.</div> // Display when no users are found
            ) : (
                <table className="user-table">
                    <thead>
                        <tr className='table-header'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Address</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td data-label="Name">{user.name}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Number">{user.number}</td>
                                <td data-label="Address">{user.address}</td>
                                <td data-label="Options">
                                    <button onClick={() => setDeleteConfirm(user._id)} className='deleteUser'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            {!searchQuery && totalPages > 1 && (
                <div className="pagination-container">
                    <div className="pagination-info">
                        <span>
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} customers
                        </span>
                    </div>
                    <div className="pagination-controls">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`}
                        >
                            Previous
                        </button>

                        {/* Page numbers */}
                        <div className="page-numbers">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = index + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = index + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + index;
                                } else {
                                    pageNumber = currentPage - 2 + index;
                                }

                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`page-btn ${currentPage === pageNumber ? 'active' : ''}`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this Customer? This action cannot be undone.</p>
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
                                Delete Customer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
