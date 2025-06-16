import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getKutir, updateKutirShilpo } from '../../Api';
import Loader from '../loader';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Predefined categories
    const categories = [
        "বাবা-মায়ের জন্য",
        "শ্বশুর-শাশুড়ির জন্য",
        "বড় ভাই-ছোট ভাইয়ের জন্য",
        "বড় বোন- ছোট বোন",
        "হাজেব্যান্ড-ওয়াইফ প্যাকেজ",
        "জন্মদিনের প্যাকেজ",
        "বিবাহবার্ষিকী প্যাকেজ",
        "বিয়ের উপহার",
        "কাপল প্যাকেজ",
        "বাচ্ছাদের জন্য গিফট",
        "কলিগ-এর জন্য গিফট",
        "বন্ধুর জন্য - বান্ধবীর জন্য",
        "নিউ-বর্ণ-বেবি গিফ্ট",
        "বেয়াই-বেয়াইন -প্যাকেজ",
        "কাস্টমাইজ"
    ];
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        contact: '',
        images: '',
        imageId: ''
    });
    const [isLoading, setLoading] = useState(true);
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        let isMounted = true;
        (async () => {
            try {
                const res = await getKutir(id);
                if (isMounted && res) {
                    setProductData({
                        name: res.name || '',
                        description: res.disc || '',
                        price: res.price != null ? res.price : '',
                        contact: res.contact || '',
                        images: res.imageUrl || '',
                        imageId: res.imageId || ''
                    });
                }
            } catch (err) {
                console.error(err);
                if (isMounted) setError('Failed to load product data.');
            } finally {
                if (isMounted) setLoading(false);
            }
        })();
        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccessMsg('');
        try {
            // Prepare payload. Since image is not changeable, we send only JSON.
            const payload = {
                name: productData.name,
                disc: productData.description,
                price: productData.price,
                contact: productData.contact,
                imageUrl: productData.images,
                imageId: productData.imageId
            };

            await updateKutirShilpo(id, payload);
            alert('Kutir updated successfully!');
            setSuccessMsg('kutir updated successfully.');
            navigate(`/kutirshilpo`);
            // Navigate back to show page after short delay
            // setTimeout(() => {
            //     navigate(`/products`);
            // }, 1200);
        } catch (err) {
            console.error(err);
            setError(err || 'Failed to update Kutir. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return <Loader />;
    }
    if (error && !productData.name) {
        // if initial load failed
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-[#cfe7fc] flex justify-center items-start md:!py-10">
            <div className="bg-white lg:w-[800px] w-full mx-4 shadow-lg rounded-2xl !p-6">
                <h2 className="text-2xl font-bold mb-6">Edit Kutir Item</h2>

                {error && (
                    <div className="mb-4 text-red-600">
                        {error}
                    </div>
                )}
                {successMsg && (
                    <div className="mb-4 text-green-600">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            value={productData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="price"
                        >
                            Price (৳)
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    {/* Contact */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="contact"
                        >
                            Contact
                        </label>
                        <input
                            type="text"
                            name="contact"
                            id="contact"
                            value={productData.contact}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-2 !pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium !py-2 !px-4 rounded-xl shadow ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <SaveIcon className="!mr-2" />
                            {isSubmitting ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium !py-2 !px-4 rounded-xl shadow"
                        >
                            <CancelIcon className="!mr-2" />
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
