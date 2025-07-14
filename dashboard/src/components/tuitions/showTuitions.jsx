import React, { useState, useEffect } from 'react';
import { getAllTuitions, deleteTuition } from "../../Api"
import Spinner from "../loader"
import './showTuitions.css';
import { Link } from 'react-router-dom';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllTuitions();
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
            await deleteTuition(id);
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
    if (error) return <div className="order-table-error">Error: {error}</div>;


    return (
        <div id='order-table-container'>
            <div className="order-table-content">
                <div className="order-table-search-container">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="order-table-search-input"
                    />
                    <div>
                        <Link to='/addTuition' className="order-table-btn">Add</Link>
                    </div>
                </div>

                <div className="order-table-responsive">
                    <div className="order-table-header">
                        <div>Code</div>
                        <div>Gender</div>
                        <div>Address</div>
                        <div>Qualification</div>
                        <div>Students</div>
                        <div>Subjects</div>
                        <div>Days</div>
                        <div>Salary</div>
                        <div>Contact</div>
                        <div>Option</div>
                    </div>

                    {filteredOrders.length === 0 ? (
                        <div className="order-table-no-results">No Tuitions found</div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <div className="order-table-row" key={index}>
                                <div data-label="Code">{order.code}</div>
                                <div data-label="Gender">{order.gender}</div>
                                <div data-label="Address">{order.address}</div>
                                <div data-label="Qualification">{order.qualification}</div>
                                <div data-label="Students">{order.students}</div>
                                <div data-label="Subjects">{order.subjects}</div>
                                <div data-label="Days">{order.daysPerWeek}</div>
                                <div data-label="salary">{order.salary}</div>
                                <div data-label="Contact">{order.contact}</div>
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
                        <p>Are you sure you want to delete this Tuition? This action cannot be undone.</p>
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
                                Delete Tuition
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;
