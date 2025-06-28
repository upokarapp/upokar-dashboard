
import React, { useState, useEffect } from 'react';
import Spinner from "../loader"
import { getAllSliderImages, createSliderImage, updateSliderImage, deleteSliderImage } from '../../Api';
import './ImageGallery.css';

const ImageGallery = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [updatingImage, setUpdatingImage] = useState(null);
    const [deletingImage, setDeletingImage] = useState(null);
    const [updatedFile, setUpdatedFile] = useState(null);
    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await getAllSliderImages();
            setImages(res);
        } catch (err) {
            alert('Error fetching images');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', selectedFile);
        setLoading(true);
        try {
            await createSliderImage(formData);
            fetchImages();
            setSelectedFile(null);
            setPreviewUrl('');
        } catch (err) {
            alert('Error uploading image');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFile = (e) => {
        setUpdatedFile(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (updatedFile) {
            formData.append('image', updatedFile);
            formData.append('id', updatingImage.id);
            formData.append('_id', updatingImage._id);
        }


        try {
            setLoading(true);
            await updateSliderImage(formData);
            fetchImages();
            setUpdatingImage(null);
            setUpdatedFile(null);
        } catch (err) {
            alert('Error updating image');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteSliderImage({ _id: deletingImage._id, id: deletingImage.id });
            fetchImages();
            setDeletingImage(null);
        } catch (err) {
            alert('Error deleting image');
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return <Spinner />
    }
    return (
        < div className="ig-container" >
            <header className="ig-header">
                <h1 className="ig-title">📸 Photo Gallery</h1>
                <form onSubmit={handleUpload} className="ig-upload-form">
                    <label className="ig-upload-label">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="ig-upload-input"
                            accept="image/*"
                            name='image'
                        />
                        <span className="ig-upload-button">+ Upload New</span>
                    </label>
                    {previewUrl && (
                        <div className="ig-preview-wrapper">
                            <img src={previewUrl} alt="Preview" className="ig-preview" />
                            <button type="submit" className="ig-submit-button">
                                Confirm Upload
                            </button>
                        </div>
                    )}
                </form>
            </header>

            {
                updatingImage && (
                    <div className="ig-modal">
                        <div className="ig-modal-content">
                            <h3>Update Image</h3>
                            <form onSubmit={handleUpdate} className="ig-update-form">
                                <label className="ig-update-label">
                                    <input
                                        type="file"
                                        onChange={handleUpdateFile}
                                        className="ig-update-input"
                                        accept="image/*"
                                    />
                                    <span className="ig-update-choose">Choose New File</span>
                                </label>
                                <div className="ig-modal-actions">
                                    <button
                                        type="button"
                                        className="ig-modal-cancel"
                                        onClick={() => setUpdatingImage(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="ig-modal-confirm">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                deletingImage && (
                    <div className="ig-modal">
                        <div className="ig-modal-content">
                            <h3>Delete Image</h3>
                            <p className="ig-delete-warning">
                                Are you sure you want to delete this image? This action cannot be undone.
                            </p>
                            <div className="ig-modal-actions">
                                <button
                                    type="button"
                                    className="ig-modal-cancel"
                                    onClick={() => setDeletingImage(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="ig-modal-delete"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className="ig-grid">
                {images.map((image) => (
                    <article key={image._id} className="ig-card">
                        <div className="ig-card-inner">
                            <img
                                src={image.url}
                                alt={image.filename}
                                className="ig-card-image"
                            />
                            <div className="ig-card-overlay">
                                <div className="ig-card-actions">
                                    <button
                                        onClick={() => setUpdatingImage(image)}
                                        className="ig-card-edit"
                                    >
                                        ✎ Edit
                                    </button>
                                    <button
                                        onClick={() => setDeletingImage(image)}
                                        className="ig-card-delete"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div >
    );
};

export default ImageGallery;