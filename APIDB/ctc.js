import React from 'react';
import './styles2.css'; 
import { useNavigate } from 'react-router-dom';
const ContactPage = () => {
    const navigate = useNavigate();

  // Function to navigate to the certification page
  const navigateToEducationPage = () => {
    navigate('/educationPage'); // Ensure the path matches what's defined in the Routes
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
            <form action="#">
                <div className="user-details">
                    <div className="input-box">
                        <span className="details">Name</span>
                        <input type="text" />
                    </div>
                    <div className="input-box">
                        <span className="details">Preferred Name</span>
                        <input type="text" />
                    </div>
                    <div className="input-box">
                        <span className="details">Phone Number</span>
                        <input type="text" />
                    </div>
                    <div className="input-box">
                        <span className="details">Email ID</span>
                        <input type="email" />
                    </div>
                    <p>What's your go-to handle for social media? (Please provide the links)</p>
                    <div className="input-box">
                        <span className="details">LinkedIn</span>
                        <input type="text" />
                    </div>
                    <div className="input-box">
                        <span className="details">GitHub</span>
                        <input type="text" />
                    </div>
                    <button onClick={navigateToEducationPage}>Click To Proceed</button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;