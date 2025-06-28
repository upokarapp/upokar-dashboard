import React, { useState, useEffect } from 'react';
import { getAllDoctors, deleteDoctor } from "../../Api"
import { Link } from 'react-router-dom';
import Spinner from "../loader"
import './showDoctors.css';

const OrderTable = () => {
    const [doctorsData, setDoctorsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllDoctors();
            // Flatten hospitals into individual doctor objects with diagnosticId
            const allDoctors = response.flatMap(hospital =>
                hospital.doctors.map(doctor => ({
                    ...doctor,
                    diagnosticId: hospital._id
                }))
            );
            setDoctorsData(allDoctors);
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
            await deleteDoctor(data);
            setDeleteConfirm(null);
            fetchData()
        } catch (err) {
            alert("Failed to delete doctor");
            setDeleteConfirm(null);
            setLoading(false);
        }
    }

    const filteredDoctors = doctorsData.filter(doctor => {
        return Object.values(doctor).some(value =>
            value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase()));
    });


    if (loading) return <Spinner />;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div id='doctor-table'>
            <div className="order-table-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div>
                        <Link to='/addDoctor' className="btn primary">Add </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <div className="table-header">
                        <div>Name</div>
                        <div>Specialization</div>
                        <div>Qualifications</div>
                        <div>Gender</div>
                        <div>Option</div>
                    </div>

                    {filteredDoctors.length === 0 ? (
                        <div className="no-results">No doctors found</div>
                    ) : (
                        filteredDoctors.map((doctor, index) => (
                            <div className="table-row" key={index}>
                                <div data-label="Name">{doctor.name}</div>
                                <div data-label="Specialization">{doctor.specialization}</div>
                                <div data-label="Qualifications">{doctor.qualifications}</div>
                                <div data-label="Gender">{doctor.gender}</div>
                                <div data-label="Delete">
                                    <span
                                        onClick={() => setDeleteConfirm({
                                            diagnosticId: doctor.diagnosticId,
                                            doctorId: doctor._id
                                        })}
                                        className='deleteUser'
                                    >
                                        Delete
                                    </span>
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
                        <p>Are you sure you want to delete this doctor? This action cannot be undone.</p>
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
                                Delete Doctor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;