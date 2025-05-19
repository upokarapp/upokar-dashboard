import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icon for selected image
import { getAllSliderImages } from '../../Api'; // Adjust the path as necessary
import './linkProduct.css'; // Ensure CSS is imported

const AddProduct = () => {
    // State for product form data, including the link ID
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        carouselImageLink: '' // Will store the _id of the selected carousel image
    });

    // State for product images to upload
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    // State for available carousel images to link
    const [availableCarouselImages, setAvailableCarouselImages] = useState([]);
    const [carouselLoading, setCarouselLoading] = useState(false);
    const [carouselError, setCarouselError] = useState(null);

    // State for form validation and submission status
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Categories list
    const categories = ['Bike', 'Furniture', 'Book', 'Electronics', 'Mobile', 'Grocery', 'Others'];

    // Effect to fetch available carousel images on component mount
    useEffect(() => {
        const fetchCarouselImages = async () => {
            setCarouselLoading(true);
            setCarouselError(null); // Reset error before fetching
            try {
                // Assuming getCarouselImages returns an array of objects like { _id: '...', imageUrl: '...' }
                const response = await getAllSliderImages();
                // Basic validation of response structure
                if (Array.isArray(response)) {
                    setAvailableCarouselImages(response);
                } else {
                    console.error('Unexpected response format from getCarouselImages:', response);
                    setAvailableCarouselImages([]);
                    setCarouselError('Failed to load carousel images (invalid format).');
                }
            } catch (error) {
                console.error('Error fetching carousel images:', error);
                setCarouselError(error.message || 'Failed to load carousel images. Please try again later.');
                setAvailableCarouselImages([]); // Clear images on error
            } finally {
                setCarouselLoading(false);
            }
        };
        fetchCarouselImages();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Cleanup object URLs for product image previews
    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image.preview));
        };
    }, [images]);

    // Handle changes in text inputs and select dropdown
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear validation error for the field being changed
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // Handle selection of a carousel image to link
    const handleCarouselImageSelect = (imageId) => {
        setProductData(prev => ({
            ...prev,
            // If the same image is clicked again, deselect it (set link to '')
            carouselImageLink: prev.carouselImageLink === imageId ? '' : imageId
        }));
        // Optionally clear any specific error related to carousel selection if needed
        // setErrors(prev => ({ ...prev, carouselImageLink: '' }));
    };

    // Handle adding product images for upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        if (files.length === 0) return; // No files selected

        // Limit the number of images
        if (files.length + images.length > 3) {
            setErrors(prev => ({ ...prev, images: 'Maximum 3 images allowed' }));
            return;
        }

        // Filter for valid image types
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length !== files.length) {
             setErrors(prev => ({ ...prev, images: 'Please upload only valid image files (jpg, png, gif, etc.)' }));
             // Optionally only add the valid ones if desired
        }

        if (validFiles.length > 0) {
            const newImages = validFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file) // Create preview URL
            }));
            setImages(prev => [...prev, ...newImages]);
            setErrors(prev => ({ ...prev, images: '' })); // Clear image error on successful add
        }

        // Clear the file input value to allow selecting the same file again if removed
         if (fileInputRef.current) {
            fileInputRef.current.value = '';
         }
    };

    // Handle removal of a product image preview
    const handleRemoveImage = (indexToRemove) => {
        // Revoke the object URL before removing the image from state
        URL.revokeObjectURL(images[indexToRemove].preview);
        setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
         // If removing the last image caused an error, clear it
         if (images.length === 1 && errors.images === 'At least one image is required') {
            setErrors(prev => ({ ...prev, images: '' }));
         }
    };

    // Validate the entire form before submission
    const validateForm = () => {
        const newErrors = {};
        if (!productData.name.trim()) newErrors.name = 'Product name is required';
        if (!productData.description.trim()) newErrors.description = 'Description is required';
        if (!productData.price || isNaN(productData.price) || parseFloat(productData.price) <= 0) {
            newErrors.price = 'Valid positive price is required';
        }
        if (!productData.category) newErrors.category = 'Category is required';
        if (!productData.carouselImageLink) newErrors.carouselImageLink = 'please select a carousel image';
        if (images.length === 0) newErrors.images = 'At least one product image is required';
        // Note: carouselImageLink is optional, so no validation here unless required

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Stop submission if validation fails

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            // Append product data
            formData.append('name', productData.name.trim());
            formData.append('description', productData.description.trim());
            formData.append('price', productData.price);
            formData.append('category', productData.category);

            // Append the linked carousel image ID *only if* one is selected
            if (productData.carouselImageLink) {
                formData.append('carouselImageLink', productData.carouselImageLink);
            }

            // Append product images
            images.forEach((image) => {
                formData.append(`images`, image.file); // Use 'images' as the key, matching common backend expectations
            });

            // Make the API call
            // Replace with your actual API endpoint
            const response = await axios.post('https://upokar-dashboard-api.onrender.com/api/linkProducts', formData, {
                headers: {
                    // Content-Type is automatically set to 'multipart/form-data' by axios when using FormData
                }
            });

            // Handle success (assuming response.data indicates success)
            if (response.data) { // Adjust based on your actual API response structure
                alert('Product added successfully!');
                // Reset form state
                setProductData({ name: '', description: '', price: '', category: '', carouselImageLink: '' });
                setImages([]);
                setErrors({});
                if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
            } else {
                 // Handle cases where API responds 2xx but indicates logical failure
                 setErrors({ submit: response.data.message || 'An unexpected error occurred.' });
                 alert(`Failed to add product: ${response.data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error submitting product:", error);
            // Extract more specific error message if available from backend response
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add product due to a network or server error.';
            setErrors(prev => ({ ...prev, submit: errorMessage })); // Show error near submit button or globally
            alert(`Error: ${errorMessage}`);
        } finally {
            setIsSubmitting(false); // Re-enable submit button
        }
    };

    return (
        <div className="add-product-container">
            <h2>Link New Product</h2>
            <form onSubmit={handleSubmit} noValidate> {/* Add noValidate to prevent default HTML5 validation */}
                {/* Product Name */}
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className={errors.name ? 'error' : ''}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <span id="name-error" className="error-message">{errors.name}</span>}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className={errors.description ? 'error' : ''}
                        aria-invalid={errors.description ? 'true' : 'false'}
                        aria-describedby={errors.description ? 'description-error' : undefined}
                    />
                    {errors.description && <span id="description-error" className="error-message">{errors.description}</span>}
                </div>

                {/* Price */}
                <div className="form-group">
                    <label htmlFor="price">Price ($)</label>
                    <input
                        id="price"
                        type="number"
                        name="price"
                        step="0.01"
                        min="0.01" // Basic HTML5 validation
                        value={productData.price}
                        onChange={handleInputChange}
                        className={errors.price ? 'error' : ''}
                        aria-invalid={errors.price ? 'true' : 'false'}
                        aria-describedby={errors.price ? 'price-error' : undefined}
                    />
                    {errors.price && <span id="price-error" className="error-message">{errors.price}</span>}
                </div>

                {/* Category */}
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        className={errors.category ? 'error' : ''}
                        aria-invalid={errors.category ? 'true' : 'false'}
                        aria-describedby={errors.category ? 'category-error' : undefined}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && <span id="category-error" className="error-message">{errors.category}</span>}
                </div>

                {/* Product Images Upload */}
                <div className="form-group">
                    <label>Product Images (max 3)</label>
                    <div className="image-upload-section">
                        {/* Hidden file input triggered by button */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*" // Specify accepted file types
                            multiple
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                            aria-label="Upload product images"
                        />
                        {/* Button to trigger file input */}
                        <button
                            type="button"
                            className="upload-button"
                            onClick={() => fileInputRef.current?.click()} // Use optional chaining
                            disabled={images.length >= 3 || isSubmitting} // Disable if max images reached or submitting
                        >
                            <AddCircleIcon /> {/* Removed material-icons class */}
                            Add Images
                        </button>

                        {/* Image Previews */}
                        <div className="image-previews">
                            {images.map((image, index) => (
                                <div key={index} className="image-preview">
                                    <img src={image.preview} alt={`Product preview ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => handleRemoveImage(index)}
                                        aria-label={`Remove product image ${index + 1}`}
                                        title="Remove image" // Tooltip for clarity
                                        disabled={isSubmitting}
                                    >
                                        <CloseIcon fontSize="small" /> {/* Use fontSize prop */}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {errors.images && <span className="error-message">{errors.images}</span>}
                </div>

                {/* Carousel Image Link Section */}
                <div className="form-group carousel-selection-section">
                    <label>Link Carousel Image (Optional)</label>
                    {carouselLoading && <div className="carousel-loading">Loading carousel images...</div>}
                    {carouselError && <div className="carousel-error error-message">{carouselError}</div>}

                    {!carouselLoading && !carouselError && availableCarouselImages.length === 0 && (
                        <div className="carousel-empty">No carousel images available to link.</div>
                    )}

                    {!carouselLoading && !carouselError && availableCarouselImages.length > 0 && (
                        <div className="carousel-image-grid">
                            {availableCarouselImages.map((img) => (
                                <div
                                    key={img._id}
                                    className={`carousel-image-item ${productData.carouselImageLink === img._id ? 'selected' : ''}`}
                                    onClick={() => !isSubmitting && handleCarouselImageSelect(img._id)} // Prevent selection during submission
                                    role="button" // Indicate clickability
                                    tabIndex={0} // Make it focusable
                                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !isSubmitting && handleCarouselImageSelect(img._id)} // Keyboard selection
                                    aria-pressed={productData.carouselImageLink === img._id} // Accessibility for selection state
                                >
                                    <img src={img.url} alt={`Carousel image option ${img._id}`} />
                                    {productData.carouselImageLink === img._id && (
                                        <div className="selected-indicator">
                                            <CheckCircleIcon fontSize="large" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {errors.carouselImageLink && <span className="error-message">{errors.carouselImageLink}</span>}
                </div>


                {/* Submit Button and Submission Error */}
                {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
