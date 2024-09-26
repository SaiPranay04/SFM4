import React, { useState } from 'react';
import './styles2.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    preferredName: '',
    phoneNumber: '',
    email: '',
    linkedIn: '',
    github: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      // Send form data to the backend
      await axios.post('http://localhost:5000/api/contact', formData);

      // Navigate to education page after successful submission
      navigate('/educationPage');
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container">
      <div>
        <h1 style={{ top: '10px', textAlign: 'center' }}>RESUME BUILDER CONTACT PAGE</h1>
      </div>
      <br /><br /><br />
      <div className="title">
        <small>Ready to get noticed? Share your contact info here so that the recruiters can reach out and make magic happen!</small>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <div className="input-box">
            <span className="details">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Preferred Name</span>
            <input
              type="text"
              name="preferredName"
              value={formData.preferredName}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-box">
            <span className="details">Email ID</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <p>What's your go-to handle for social media? (Please provide the links)</p>
          <div className="input-box">
            <span className="details">LinkedIn</span>
            <input
              type="text"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <span className="details">GitHub</span>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
            />
          </div>
          <button type="submit" onClick={navigateToEducationPage}>Click To Proceed</button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
