import React, { useState, useEffect } from 'react';
import { getAllProduct, deleteProduct, searchProduct } from "../../Api";
import "./products.css";
import Spinner from "../loader"; // Assuming you already have a spinner component

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for fetching data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchError, setSearchError] = useState(null); // Error state for search
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Function to fetch all products
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllProduct();
      setUsers(response);
      setError(null);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    // If search query is empty, fetch all products
    if (!searchQuery.trim()) {
      fetchData();
      return;
    }
    setLoading(true);
    try {
      const response = await searchProduct(searchQuery);
      setUsers(response);
      setSearchError(null);
    } catch (err) {
      setSearchError("Error searching products");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle delete user/product
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      // Refresh the list after deletion
      fetchData();
    } catch (err) {
      alert('Failed to delete user');
    } finally {
      setLoading(false);
      setDeleteConfirm(null); // Close the confirmation modal
    }
  };

  // Fetch all products on component mount
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
    <div className="product-table-container" id='product-table'>
      {/* Search Form */}
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
          {searchError && <div className="error-message">{searchError}</div>}
        </form>
      </div>

      {/* Error Message for Data Fetching */}
      {error && <div className="error-message">{error}</div>}

      {/* Table or message if no products found */}
      {users.length === 0 ? (
        <div className="no-users-message">There are no product found.</div>
      ) : (
        <table className="user-table">
          <thead>
            <tr className='table-header'>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Sid</th>
              <th>Category</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td data-label="Image">
                  <img src={user.images[0].url} className='product-image' alt={user.name} />
                </td>
                <td data-label="Name">{user.name}</td>
                <td data-label="Price">{user.price}</td>
                <td data-label="SellerId">{user.sellerId}</td>
                <td data-label="Category">{user.category}</td>
                <td data-label="Options">
                  <button onClick={() => setDeleteConfirm(user._id)} className='deleteUser'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deleteConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this Product? This action cannot be undone.</p>
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
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
