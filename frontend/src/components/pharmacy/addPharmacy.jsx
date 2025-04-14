import React, { useState } from 'react';
import axios from 'axios';
import { createPharmacy } from "../../Api"

const AmbulanceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        location: '',
        time: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update fields and clear individual errors on change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Basic form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Pharmacy name is required';
        }
        if (!formData.number.trim()) {
            newErrors.number = 'Number is required';
        } else if (!/^\d{10,11}$/.test(formData.number)) {
            newErrors.number = 'Enter a valid phone number (10 to 11 digits)';
        }
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }
        if (!formData.time.trim()) {
            newErrors.time = 'Opening time is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log(formData);
        
        // setIsSubmitting(true);

        try {
            // Post the form data to your backend API endpoint for adding an ambulance
            await createPharmacy(formData);
            setFormData({ name: '', number: '', location: '', time: '' });
            alert('Pharmacy added successfully!');
        } catch (error) {
            // Display error message based on server response if available
            alert(`Error: ${error.response?.data?.message || 'Failed to add pharmacy'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-[800px] !m-auto !p-6 !mt-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Pharmacy</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pharmacy Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pharmacy Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number
                    </label>
                    <input
                        type="text"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.number ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.number && (
                        <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Open and Close time
                    </label>
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        placeholder='সোম-শুক্র: ৮:০০ - ১০:০০'
                        className={`w-full p-2 border rounded-md ${errors.time ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.time && (
                        <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white font-bold rounded-md bg-blue-500 hover:bg-blue-600 !p-2 !mt-5"
                >
                    {isSubmitting ? 'Submitting...' : 'Add Pharmacy'}
                </button>
            </form>
        </div>
    );
};

export default AmbulanceForm;
