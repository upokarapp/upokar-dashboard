import React, { useState } from "react";
import { createNotification } from "../../Api";
import Spinner from "../loader";
import "./sendNotification.css";
import { useNavigate } from "react-router-dom";
const SendNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    discription: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!formData.title.trim() || !formData.discription.trim()) {
      setError("Title and description are required");
      return false;
    }
    return true;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await createNotification(formData);
      setSuccess("Notification sent successfully!");
      setFormData({ title: "", discription: "" });
      navigate("/notifications");
    } catch (err) {
      setError(err.message || "Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="notify-container">
      <h2 className="notify-title">Send Notification</h2>
      <form className="notify-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter notification title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="discription">Description</label>
          <textarea
            id="discription"
            name="discription"
            value={formData.discription}
            onChange={handleChange}
            placeholder="Enter notification body"
            rows="4"
          />
        </div>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <button type="submit" className="notify-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendNotification;
