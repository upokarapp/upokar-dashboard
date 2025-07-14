import React, { useState, useEffect } from 'react';
import { getAllLostPerson, deleteLostPerson } from "../../Api"
import Spinner from "../loader"
import './showLostPerson.css';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllLostPerson();
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
            await deleteLostPerson({ id: deleteConfirm.imageId, _id: deleteConfirm._id });
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
        <div id='lost-table'>
            <div className="order-table-container" >
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Image</div>
                        <div>Number</div>
                        <div>description</div>
                        <div>Option</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="no-results">No orders found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Image"><img src={order.imageUrl} className='lost-img' alt="" /></div>
                                <div data-label="Number">{order.number}</div>
                                <div data-label="Description">{order.description}</div>
                                <div data-label="Delete"> <span onClick={() => setDeleteConfirm(order)} className='deleteUser'>Delete</span></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this Labor Order? This action cannot be undone.</p>
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
                                Delete Lost Person
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;