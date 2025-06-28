import React, { useState, useEffect } from 'react';
import { getAllJobs, deleteJob } from "../../Api"
import Spinner from "../loader"
import './showAllJobs.css';
import { Link } from 'react-router-dom';

const JobTable = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null)

    const fetchData = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response);
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
            await deleteJob(id);
            setDeleteConfirm(null);
            fetchData();
        } catch (err) {
            alert("Failed to delete Job");
            setDeleteConfirm(null);
            setLoading(false);
        }
    }

    const filteredJobs = jobs.filter(job => {
        return Object.values(job).some(value =>
            value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <Spinner />;
    if (error) return <div className="job-table-error">Error: {error}</div>;


    return (
        <div id='job-table-container'>
            <div className="job-table-content">
                <div className="job-table-search-container">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="job-table-search-input"
                    />
                    <div>
                        <Link to='/addJob' className="job-table-btn">Add</Link>
                    </div>
                </div>

                <div className="job-table-responsive">
                    <div className="job-table-header">
                        <div>Employer</div>
                        <div>Job Type</div>
                        <div>Salary</div>
                        <div>Qualification</div>
                        <div>Experience</div>
                        <div>Deadline</div>
                        <div>Location</div>
                        <div>Description</div>
                        <div>Contact</div>
                        <div>Option</div>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="job-table-no-results">No jobs found</div>
                    ) : (
                        filteredJobs.map((job, index) => (
                            <div className="job-table-row" key={index}>
                                <div data-label="Employer">{job.employer}</div>
                                <div data-label="Job Type">{job.jobType}</div>
                                <div data-label="Salary">{job.salary}</div>
                                <div data-label="Qualification">{job.qualification}</div>
                                <div data-label="Experience">{job.experience}</div>
                                <div data-label="Deadline">{job.deadline}</div>
                                <div data-label="Location">{job.location}</div>
                                <div data-label="Description">{job.description}</div>
                                <div data-label="Contact">{job.contactNumber}</div>
                                <div data-label="Delete"> <span onClick={() => setDeleteConfirm(job._id)} className='deleteUser'>Delete</span></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {deleteConfirm && (
                <div className="confirmation-modal">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete this Job? This action cannot be undone.</p>
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
                                Delete Job
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobTable;
