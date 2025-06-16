// JobPostForm.js
import React, { useState } from 'react';
import Spinner from "../loader"
import { createJob } from '../../Api';
import './JobPostForm.css';

const JobPostForm = () => {
    const [formData, setFormData] = useState({
        employer: '',
        jobType: '',
        salary: '',
        qualification: '',
        experience: '',
        deadline: '',
        location: '',
        description: '',
        contactNumber: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.employer || !formData.salary || !formData.deadline || !formData.location || !formData.description || !formData.contactNumber) {
            setError('দয়া করে সকল প্রয়োজনীয় তথ্য প্রদান করুন');
            return;
        }

        if (!/^01[3-9]\d{8}$/.test(formData.contactNumber)) {
            setError('সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)');
            return;
        }

        try {
            setLoading(true);
            const response = await createJob(formData);
            setFormData({
                employer: '',
                jobType: '',
                salary: '',
                qualification: '',
                experience: '',
                deadline: '',
                location: '',
                description: '',
                contactNumber: ''
            });
            alert('জব পোস্ট সফলভাবে তৈরি হয়েছে!');
        } catch (err) {
            alert('ডাটা সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন');
        }finally {
            setLoading(false);
        }

    };
    if (loading) return <Spinner />;
    return (
        <div className="job-form-container">
            <h2 className="job-form-heading">চাকরি ফর্ম</h2>
            <form onSubmit={handleSubmit} className="job-form-main">
                <div className="job-form-group">
                    <label className="job-form-label">সংস্থার নাম*</label>
                    <input
                        type="text"
                        name="employer"
                        value={formData.employer}
                        onChange={handleChange}
                        className="job-form-input"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">চাকরির ধরন*</label>
                    <input
                        type="text"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="job-form-input"
                        placeholder="যেমন: পার্ট টাইম, ফুল টাইম, কন্ট্রাক্ট"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">বেতন*</label>
                    <input
                        type="text"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="job-form-input"
                        placeholder="উদাহরণ: ১৫,০০০ - ২০,০০০ টাকা"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">শিক্ষাগত যোগ্যতা*</label>
                    <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="job-form-input"
                        placeholder="যেমন: স্নাতক, এইচএসসি, এসএসসি"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">অভিজ্ঞতা</label>
                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="job-form-input"
                        placeholder="যেমন: ২ বছর, ৫ বছর"
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">আবেদনের শেষ তারিখ*</label>
                    <input
                        type="text"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="job-form-input"
                        placeholder="উদাহরণ: ২০ ডিসেম্বর, ২০২৩"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">লোকেশন*</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="job-form-input"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">চাকরির বিবরণ*</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="job-form-textarea"
                        required
                    />
                </div>

                <div className="job-form-group">
                    <label className="job-form-label">যোগাযোগ নম্বর*</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="job-form-input"
                        pattern="01[3-9]{1}\d{8}"
                        title="০১xxxxxxxxx"
                        required
                    />
                </div>

                <button type="submit" className="job-form-button">
                    সাবমিট করুন
                </button>
            </form>
        </div>
    );
};

export default JobPostForm;
