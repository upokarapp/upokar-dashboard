import React, { useContext, useEffect, useState } from 'react';
import { use } from 'react';
import { getAdminData, adminUpdate } from "../../Api"
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context"

const UpdateProfilePage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const [isAdmin, setIsAdmin] = useState(false);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State to manage error messages
  const [errors, setErrors] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // State to show success message
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  // Validate the form data
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    }
    // else if (formData.newPassword.length < 6) {
    //   newErrors.newPassword = 'Password must be at least 6 characters';
    //   isValid = false;
    // }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    // Reset form and show success message
    // setFormData({
    //   username: '',
    //   currentPassword: '',
    //   newPassword: '',
    //   confirmPassword: '',
    // });

    try {
      const response = await adminUpdate(formData);
      console.log(response);
      
      dispatch({ type: "ADMIN_UPDATE", payload: response });
      setFormData((prevData) => ({
        ...prevData,
        username: response.name,
        currentPassword: response.password
      }))
      setSuccessMessage('Profile updated successfully!');
      // navigate('/');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await getAdminData();

        if (response.type === "main") {
          setIsAdmin(true);
          setFormData((prevData) => ({
            ...prevData,
            username: response.name,
            currentPassword: response.password
          }))
        }
        else navigate("/");
      } catch (error) {
        navigate("/");
      }
    };
    checkAdmin();
  }, []);
  return (
    isAdmin &&
    <div className="update-profile-container" style={styles.container}>
      <h2 style={styles.containerTitle}>Update Profile</h2>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Username Field */}
        <div style={styles.inputGroup}>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.username && <p style={styles.error}>{errors.username}</p>}
        </div>

        {/* Current Password Field */}
        <div style={styles.inputGroup}>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="text"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.currentPassword && (
            <p style={styles.error}>{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password Field */}
        <div style={styles.inputGroup}>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.newPassword && (
            <p style={styles.error}>{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && (
            <p style={styles.error}>{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  containerTitle: {
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
  successMessage: {
    color: 'green',
    fontSize: '16px',
    marginBottom: '15px',
  },
};

export default UpdateProfilePage;