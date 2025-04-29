import React, { useState, useRef } from 'react';
import axios from 'axios';

const SkillAndIT = () => {
    const [formData, setFormData] = useState({
        centerName: '',
        contactNumber: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
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
        if (!formData.centerName.trim()) newErrors.centerName = 'Center name is required';
        if (!formData.contactNumber.match(/^\d{11}$/)) newErrors.contactNumber = 'Valid 11-digit number required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!image) newErrors.image = 'Center image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const form = new FormData();
            form.append('centerName', formData.centerName);
            form.append('contactNumber', formData.contactNumber);
            form.append('description', formData.description);
            form.append('image', image.file);

            await axios.post('http://localhost:2000/addAkillAndIT', form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // Reset form
            setFormData({ centerName: '', contactNumber: '', description: '' });
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            alert('Skill and IT added successfully!');
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || 'Failed to add center'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-[800px]  !m-auto !p-6 !mt-8 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Skill and IT</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Center Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill and IT Name</label>
                    <input
                        type="text"
                        name="centerName"
                        value={formData.centerName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.centerName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.centerName && <p className="text-red-500 text-sm mt-1">{errors.centerName}</p>}
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


                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill and IT Image</label>
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
                    className="add-hospital-button w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Submitting...' : 'Add Skill and IT'}
                </button>
            </form>
        </div>
    );
};

export default SkillAndIT;