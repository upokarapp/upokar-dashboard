import React, { useEffect, useState } from 'react';
import { getAllDiagnosticID, addDoctor } from '../../Api';
import Spinner from '../loader';

export default function AddDoctor() {
  const [diagnostics, setDiagnostics] = useState([]);
  const [selectedDiag, setSelectedDiag] = useState('');
  const [doctorData, setDoctorData] = useState({ name: '', specialization: '', qualifications: '', gender: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDiagnostics = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getAllDiagnosticID();
        // Ensure response.data is an array
        if (response && Array.isArray(response)) {
          setDiagnostics(response);
        } else {
          throw new Error('Unexpected server response');
        }
      } catch (err) {
        setError(err.message || 'Failed to load diagnostics');
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnostics();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Check diagnostic
    if (!selectedDiag) {
      setError('Please select a diagnostic center');
      return;
    }

    // Validate doctor fields
    const { name, specialization, qualifications, gender } = doctorData;
    if (!name.trim() || !specialization.trim() || !qualifications.trim() || !gender) {
      setError('All doctor fields are required');
      return;
    }

    setLoading(true);
    try {
      await addDoctor({ diagnosticId: selectedDiag, doctor: doctorData });
      setSuccess('Doctor added successfully!');
      // reset form
      setDoctorData({ name: '', specialization: '', qualifications: '', gender: '' });
      setSelectedDiag('');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to add doctor. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] !m-auto !p-6 !mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Doctor</h2>

      {loading && (
        <div className="flex justify-center mb-4">
          <Spinner />
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Diagnostic Center</label>
          <select
            value={selectedDiag}
            onChange={(e) => setSelectedDiag(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a center</option>
            {diagnostics.length > 0 ? (
              diagnostics.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))
            ) : (
              <option disabled>Loading centers...</option>
            )}
          </select>
        </div>

        {/* Doctor Name */}
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={doctorData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Doctor's Name"
          />
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Cardiologist"
          />
        </div>

        {/* Qualifications */}
        <div>
          <label className="block text-gray-700">Qualifications</label>
          <input
            type="text"
            name="qualifications"
            value={doctorData.qualifications}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. MBBS, MD"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={doctorData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="add-hospital-button w-full flex items-center justify-center gap-2  text-white font-bold rounded-md"
          disabled={loading}
        >
          {loading ? (
            <i className="material-icons animate-spin">autorenew</i>
          ) : (
            <i className="material-icons">add_circle</i>
          )}
          <span>Add Doctor</span>
        </button>
      </form>
    </div>
  );
}