

import React, { useState, useEffect } from 'react';
import { getAnimalCare, deleteAnimalCare } from '../../Api'
// import { getAnimalCare, deleteAnimalCare } from "../../Api"
import { Link } from 'react-router-dom';
import Spinner from "../loader"
import '../pharmacy/showPharmacy.css';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAnimalCare();
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
            await deleteAnimalCare(id);
            setDeleteConfirm(null);
            fetchData()
        } catch (err) {
            alert("Failed to delete hospital");
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
        <div id='pharmacy-table'>
            <div className="order-table-container" >
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div>
                        <Link to='/addAnimal' className="btn primary">Add </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Name</div>
                        <div>Phone</div>
                        <div>Address</div>
                        <div>Time</div>
                        <div>Option</div>
                    </div>
                    {filteredOrders.length === 0 ? (
                        <div className="no-results">No AnimalCare found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Name">{order.name}</div>
                                <div data-label="Phone">{order.number}</div>
                                <div data-label="Address">{order.location}</div>
                                <div data-label="Time">{order.time}</div>
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
                        <p>Are you sure you want to delete this Animal Care? This action cannot be undone.</p>
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
                                Delete AnimalCare
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;