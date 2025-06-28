// AdminForm.jsx
import React, { useState } from 'react';
import { createAdmin } from "../../Api";
import './createAdmin.css';

const AdminForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        // else if (password.length < 8) {
        //   newErrors.password = 'Password must be at least 8 characters';
        // } else if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password) || !/[A-Z]/.test(password)) {
        //   newErrors.password = 'Password must contain at least one number, one uppercase letter, and one special character';
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Simulate API call
            const response = await createAdmin({ name, password });
           if(response) {
               alert('Admin created successfully');
               setName('');
               setPassword('');
           }
        } catch (error) {
            console.error('Submission error:', error.messege);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="admin-form-container">
            <h2 className="form-title">Create New Admin</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="name">Admin Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? 'input-error' : ''}
                        disabled={isSubmitting}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'input-error' : ''}
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Admin'}
                </button>
            </form>
        </div>
    );
};

export default AdminForm;
