import React, { useState, useRef } from 'react';
import { addhospitals } from '../../Api'
const HospitalForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    contactNumber: '',
    location: ''
  });
  const [services, setServices] = useState(['']);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleServiceChange = (index, value) => {
    const newServices = [...services];
    newServices[index] = value;
    setServices(newServices);
  };

  const addService = () => {
    if (services.length < 15) {
      setServices([...services, '']);
    }
  };

  const removeService = (index) => {
    if (services.length > 1) {
      const newServices = services.filter((_, i) => i !== index);
      setServices(newServices);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, image: 'Please upload a valid image file' }));
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file)
    });
    setErrors(prev => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Hospital name is required';
    if (!formData.contactNumber.match(/^\d{11}$/)) newErrors.contactNumber = 'Valid 11-digit number required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (services.some(service => !service.trim())) newErrors.services = 'All services must be filled';
    if (!image) newErrors.image = 'Hospital image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const nformData = new FormData();
      nformData.append('hospitalName', formData.hospitalName);
      nformData.append('contactNumber', formData.contactNumber);
      nformData.append('location', formData.location);
      nformData.append('services', JSON.stringify(services));
      nformData.append('image', image.file);

      await addhospitals(nformData);

      // Reset form
      setFormData({ hospitalName: '', contactNumber: '', location: '' });
      setServices(['']);
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      alert('Hospital added successfully!');
    } catch (error) {
      alert(`Error: ${error || 'Failed to add hospital'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[800px] !m-auto !p-6 !mt-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Hospital</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hospital Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.hospitalName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.hospitalName && <p className="text-red-500 text-sm mt-1">{errors.hospitalName}</p>}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Services */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
          <div className="space-y-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(index, e.target.value)}
                  className={`flex-1 p-2 border rounded-md ${errors.services ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={`Service ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                {index === services.length - 1 && services.length < 15 && (
                  <button
                    type="button"
                    onClick={addService}
                    className="p-2 text-green-500 hover:text-green-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.services && <p className="text-red-500 text-sm mt-1">{errors.services}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Image</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="add-hospital-image px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Upload Image
            </button>
            {image && (
              <div className="relative">
                <img src={image.preview} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(image.preview);
                    setImage(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="add-hospital-button w-full  text-white font-bold rounded-md"
        >
          {isSubmitting ? 'Submitting...' : 'Add Hospital'}
        </button>
      </form>
    </div>
  );
};

export default HospitalForm;
