// TutorForm.js
import React, { useState } from 'react';
import { createTuition } from "../../Api"
import Spinner from "../loader"
import './addTuition.css';

const TutorForm = () => {
  const [formData, setFormData] = useState({
    gender: 'Male',
    qualification: '',
    address: '',
    students: '',
    salary: '',
    subjects: '',
    daysPerWeek: '',
    contact: ''
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.qualification || !formData.address || !formData.subjects) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await createTuition(formData);
      setFormData({
        gender: 'Female',
        qualification: '',
        address: '',
        students: '',
        salary: '',
        subjects: '',
        daysPerWeek: '',
        contact: ''
      });
    } catch (err) {
      alert("Failed to create tuition");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spinner />;
  return (
    <div className="tutor-form-container">
      <h2 className="tutor-form-title">Tutor Registration Form</h2>
      <form onSubmit={handleSubmit} className="tutor-form-main">
        <div className="tutor-form-group">
          <label className="tutor-form-label">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="tutor-form-select"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="tutor-form-group">
          <label className="tutor-form-label">Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="tutor-form-input"
            required
          />
        </div>

        <div className="tutor-form-group">
          <label className="tutor-form-label">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="tutor-form-input"
            required
          />
        </div>

        <div className="tutor-form-group">
          <label className="tutor-form-label">Number of Students:</label>
          <input
            type="number"
            name="students"
            value={formData.students}
            onChange={handleChange}
            className="tutor-form-input"
            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
          />
        </div>

        <div className="tutor-form-group">
          <label className="tutor-form-label">Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="tutor-form-input"
          />
        </div>

        <div className="tutor-form-group">
          <label className="tutor-form-label">Subjects:</label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            className="tutor-form-input"
            required
            placeholder="Separate subjects with commas"
          />
        </div>
        <div className="tutor-form-group">
          <label className="tutor-form-label">Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="tutor-form-input"
            required
          />
        </div>

        <div className="tutor-form-group">
          <label className="tutor-form-label">Days per Week:</label>
          <input
            type="number"
            name="daysPerWeek"
            value={formData.daysPerWeek}
            onChange={handleChange}
            className="tutor-form-input"
            min="1"
            max="7"
          />
        </div>

        <button type="submit" className="tutor-form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TutorForm;