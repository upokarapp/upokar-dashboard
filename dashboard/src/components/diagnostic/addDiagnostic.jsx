import React, { useState, useRef } from 'react';
import { addDiagnostic } from '../../Api'

// Component to render individual doctor inputs
const DoctorFields = ({ index, doctorData, handleDoctorChange, removeDoctor, errors }) => (
  <div className="!mb-4 p-4 border mt-2 rounded-md bg-gray-50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Doctor Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
        <input
          type="text"
          name="name"
          value={doctorData.name}
          onChange={e => handleDoctorChange(index, 'name', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors?.[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter doctor's name"
        />
        {errors?.[index]?.name && <p className="text-red-500 text-sm mt-1">{errors[index].name}</p>}
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
        <input
          type="text"
          name="specialization"
          value={doctorData.specialization}
          onChange={e => handleDoctorChange(index, 'specialization', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors?.[index]?.specialization ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter specialization"
        />
        {errors?.[index]?.specialization && <p className="text-red-500 text-sm mt-1">{errors[index].specialization}</p>}
      </div>

      {/* Qualifications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
        <input
          type="text"
          name="qualifications"
          value={doctorData.qualifications}
          onChange={e => handleDoctorChange(index, 'qualifications', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors?.[index]?.qualifications ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="e.g. MBBS, MD"
        />
        {errors?.[index]?.qualifications && <p className="text-red-500 text-sm mt-1">{errors[index].qualifications}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          name="gender"
          value={doctorData.gender}
          onChange={e => handleDoctorChange(index, 'gender', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors?.[index]?.gender ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors?.[index]?.gender && <p className="text-red-500 text-sm mt-1">{errors[index].gender}</p>}
      </div>
    </div>
    {/* Remove button */}
    {removeDoctor && (
      <div className="text-right mt-2">
        <button
          type="button"
          onClick={() => removeDoctor(index)}
          className="text-red-500 hover:text-red-700 text-lg"
          title="Remove Doctor"
        >
          &times; Remove Doctor
        </button>
      </div>
    )}
  </div>
);

const AddDiagnosticForm = () => {
  const [formData, setFormData] = useState({ diagnosticName: '', location: '', contactNumber: '' });
  const [doctors, setDoctors] = useState([{ name: '', specialization: '', qualifications: '', gender: '' }]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle simple inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };


  // Doctors handlers
  const handleDoctorChange = (index, field, value) => {
    const newDoctors = [...doctors];
    newDoctors[index][field] = value;
    setDoctors(newDoctors);
    setErrors(prev => ({
      ...prev,
      doctors: prev.doctors?.map((err, i) => i === index ? { ...err, [field]: '' } : err)
    }));
  };
  const addDoctor = () => doctors.length < 10 && setDoctors([...doctors, { name: '', specialization: '', qualifications: '', gender: '' }]);
  const removeDoctor = (index) => {
    if (doctors.length > 1) setDoctors(doctors.filter((_, i) => i !== index));
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please upload a valid image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image must be smaller than 5MB' }));
      return;
    }
    setImage({ file, preview: URL.createObjectURL(file) });
    setErrors(prev => ({ ...prev, image: '' }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.diagnosticName.trim()) newErrors.diagnosticName = 'Diagnostic name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.contactNumber.match(/^\d{11}$/)) newErrors.contactNumber = 'Valid 11-digit number required';

    const doctorErrs = doctors.map(d => ({
      name: !d.name.trim() ? 'Name is required' : '',
      specialization: !d.specialization.trim() ? 'Specialization is required' : '',
      qualifications: !d.qualifications.trim() ? 'Qualifications are required' : '',
      gender: !d.gender ? 'Gender is required' : ''
    }));
    if (doctorErrs.some(err => err.name || err.specialization || err.qualifications || err.gender)) newErrors.doctors = doctorErrs;

    if (!image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('diagnosticName', formData.diagnosticName);
      payload.append('contactNumber', formData.contactNumber);
      payload.append('location', formData.location);
      payload.append('doctors', JSON.stringify(doctors));
      payload.append('image', image.file);

      await addDiagnostic(payload);

      alert('Diagnostic added successfully!');
      setFormData({ diagnosticName: '', location: '', contactNumber: '' });
      setDoctors([{ name: '', specialization: '', qualifications: '', gender: '' }]);
      setImage(null);
      fileInputRef.current && (fileInputRef.current.value = '');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to add diagnostic';
      alert(`Error: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] !m-auto !p-6 !mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Diagnostic</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Diagnostic Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Diagnostic Name</label>
          <input
            type="text"
            name="diagnosticName"
            value={formData.diagnosticName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.diagnosticName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.diagnosticName && <p className="text-red-500 text-sm mt-1">{errors.diagnosticName}</p>}
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>


        {/* Doctors */}
        <div>
          <label className="block text-sm font-medium mb-1">Doctors</label>
          {doctors.map((doc, idx) => (
            <DoctorFields
              key={idx}
              index={idx}
              doctorData={doc}
              handleDoctorChange={handleDoctorChange}
              removeDoctor={doctors.length > 1 ? removeDoctor : null}
              errors={errors.doctors}
            />
          ))}
          {errors.doctors && typeof errors.doctors === 'string' && (
            <p className="text-red-500 text-sm">{errors.doctors}</p>
          )}
          {doctors.length < 10 && (
            <button type="button" onClick={addDoctor} className="text-blue-500 hover:underline text-sm">+ Add Doctor</button>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="dd-hospital-image px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          {image && (
            <img src={image.preview} alt="Preview" className="mt-2 h-32 object-cover rounded-md" />
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="add-hospital-button w-full  text-white font-bold rounded-md"
          >
            {isSubmitting ? 'Submitting...' : 'Add Diagnostic'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDiagnosticForm;
