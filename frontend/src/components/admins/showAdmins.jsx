import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { alladmin, deleteAdmin } from "../../Api"
import Spinner from "../loader"
import "./showAdmins.css"
const AllAdmins = () => {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const response = await alladmin()
      setAdmins(response)
      setError(null)
    } catch (err) {
      alert(err)
      
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id)
      setDeleteConfirm(null)
      fetchAdmins()
    } catch (err) {
      alert("Failed to delete admin")
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])
  
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Management</h1>
        <Link to="/createadmin" className="btn secondary">
          Create Admin
        </Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <Spinner />
          <p>Loading admins...</p>
        </div>
      ) : error ? (
        alert('Failed to fetch all admin data')
      ) : admins.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-content">
            <svg className="empty-state-icon" viewBox="0 0 24 24">
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm2 4c0-1.65-3.33-2.5-5-2.5s-5 .85-5 2.5V17h10v-1z" />
            </svg>
            <h2>No Admins Found</h2>
            <p>There are currently no sub-admins registered in the system.</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.name}</td>
                  <td>{admin.password}</td>
                  <td>
                    <div className="actions-container">
                      <button
                        className="btn icon-btn danger"
                        title="Delete"
                        onClick={() => setDeleteConfirm(admin._id)}
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this admin? This action cannot be undone.</p>
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
                Delete Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllAdmins