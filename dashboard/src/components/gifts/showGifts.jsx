import React, { useState, useEffect } from 'react';
import { getAllGift, deleteGift } from "../../Api"
import { Link, useNavigate } from 'react-router-dom';
import Spinner from "../loader"
import './showgift.css';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)


    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await getAllGift();
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
            await deleteGift(data);
            setDeleteConfirm(null);
            fetchData()
        } catch (err) {
            alert("Failed to delete gift");
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
        <div id='kutir-table'>
            <div className="order-table-container" >
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search gift items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div>
                        <Link to='/addGift' className="btn primary">Add </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Image</div>
                        <div>Name</div>
                        <div>Phone</div>
                        <div>Price</div>
                        <div>Description</div>
                        <div>Option</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="no-results">No kutir shilpo found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Image"><img src={order.imageUrl} className="kutir-table-image" alt="" /></div>
                                <div data-label="Name">{order.name}</div>
                                <div data-label="Phone">{order.contact}</div>
                                <div data-label="Price">{order.price}</div>
                                <div className='line-clamp-3' data-label="Description">{order.disc}</div>
                                <div data-label="Delete">
                                    <div className='flex flex-row gap-2 justify-start items-start'>
                                        <span onClick={() => navigate(`/editGift/${order._id}`)} className='editGift'>Edit</span>
                                        <span onClick={() => setDeleteConfirm({ _id: order._id, id: order.imageId })} className='deleteUser'>Delete</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this Gift Item? This action cannot be undone.</p>
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
                                Delete Gift Item
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;