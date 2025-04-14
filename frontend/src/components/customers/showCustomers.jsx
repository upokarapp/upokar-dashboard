import React, { useState, useEffect } from 'react';
import { getAllCustomer, deleteUser, searchCustomer } from "../../Api";
import "./showCustomers.css";
import Spinner from "../loader"; // Assuming you already have a spinner component

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state to handle fetch errors
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        try {
            const response = await getAllCustomer();
            setUsers(response);
        } catch (error) {
            setError("Error fetching data");
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const response = await deleteUser(id)
            fetchData();
            alert('User deleted successfully!');
            setLoading(false);
        } catch (error) {
            alert('Failed to fetch all admin data');
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
            const response = await searchCustomer(searchQuery);
            setLoading(false);
            setUsers(response);
        } catch (err) {
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
                                    <button onClick={() => handleDelete(user._id)} className='deleteUser'>Delete</button>
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
