import React, { useState, useEffect } from 'react';
import { getAllProduct, deleteProduct, searchProduct } from "../../Api";
import "./products.css";
import Spinner from "../loader"; // Assuming you already have a spinner component
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for fetching data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchError, setSearchError] = useState(null); // Error state for search
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/product/${id}`);
  };


  // Function to fetch all products
  const fetchData = async (page = currentPage) => {
    setLoading(true);
    try {
      const response = await getAllProduct(page, itemsPerPage);

      // Assuming the API returns an object with products array and pagination info
      // If the API returns just an array, we'll handle that case too
      if (response && typeof response === 'object' && response.products) {
        setUsers(response.products);
        setTotalItems(response.totalItems || 0);
        setTotalPages(response.totalPages || Math.ceil((response.totalItems || 0) / itemsPerPage));
      } else {
        // If API returns just an array (current behavior), treat it as first page
        setUsers(response || []);
        setTotalItems(response?.length || 0);
        setTotalPages(1);
      }
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
      setCurrentPage(1);
      fetchData(1);
      return;
    }
    setLoading(true);
    try {
      const response = await searchProduct(searchQuery);
      setUsers(response);
      setSearchError(null);
      // Reset pagination for search results
      setCurrentPage(1);
      setTotalItems(response?.length || 0);
      setTotalPages(1);
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
      fetchData(currentPage);
    } catch (err) {
      alert('Failed to delete user');
    } finally {
      setLoading(false);
      setDeleteConfirm(null); // Close the confirmation modal
    }
  };

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

  // Fetch all products on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner />
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
              <th>Seller</th>
              <th>Contact</th>
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
                <td data-label="Seller">{user.seller}</td>
                <td data-label="Contact">{user.contact}</td>
                <td data-label="Category">{user.category}</td>
                <td data-label="Options" >
                  <div className="flex gap-2">
                    <button onClick={() => handleView(user._id)} className='viewUser'>Edit</button>
                    <button onClick={() => setDeleteConfirm(user._id)} className='deleteUser'>Delete</button>
                  </div>
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
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
