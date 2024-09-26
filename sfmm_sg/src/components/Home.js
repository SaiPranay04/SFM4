import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import homepg from 'D:/hello world/Programming/new project/sfmm_sg/src/images/home_pg.jpg';
import image1 from 'D:/hello world/Programming/new project/sfmm_sg/src/images/image1.png';
import image2 from 'D:/hello world/Programming/new project/sfmm_sg/src/images/image2.png';
import image3 from 'D:/hello world/Programming/new project/sfmm_sg/src/images/image3.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Welcome Section */}
      <div className="left-side">
        <h1>Welcome to Sustainability Footprint Management</h1>
        <p>Empowering Sustainable Futures</p>
        <Link to="/loginsignup">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
      <div className="right-side">
        <img src={homepg} alt="Sustainability" />
      </div>

      {/* Carbon Footprint Measurement Section */}
      <div className="container">
        <div className="a-b-text">
          <h1>Measure Carbon Footprint</h1>
        </div>

        {/* Individual Measurement Box */}
        <div className="a-box">
          <div className="a-b-box">
            <img className="home_img" src={image1} alt="Individual" />
            <p className="p_para">Individual</p>
            <p className="p_text">Calculating an individual's carbon footprint measures the total greenhouse gas emissions from their daily activities. This helps identify ways to reduce environmental impact.</p>
            <button className="button_b">Calculate</button>
          </div>
        </div>

        {/* Organization Measurement Box */}
        <div className="b-box">
          <div className="a-b-c-box">
            <img className="home_img1" src={image2} alt="Organization" />
            <p className="p_para1">Organization</p>
            <p className="p_text1">Calculating an organization's carbon footprint involves measuring the total greenhouse gas emissions from its operations, including energy use, transportation, and waste.</p>
            <Link to="/form">
              <button className="button_b1">Calculate</button>
            </Link>
          </div>
        </div>

        {/* Restaurant Measurement Box */}
        <div className="c-box">
          <div className="a-c-box">
            <img className="home_img2" src={image3} alt="Restaurant" />
            <p className="p_para2">Restaurant</p>
            <p className="p_text2">Calculating a restaurant's carbon footprint measures the emissions from its energy use, food sourcing, and waste.</p>
            <button className="button_b2">Calculate</button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us-section">
        <h2>About us</h2>
        <blockquote>
          “Sustainability begins with awareness; progress comes with management”
        </blockquote>
        <p>
          Sustainability Footprint Management (SFM) is dedicated to helping organizations minimize their environmental impact while maximizing operational efficiency. We provide comprehensive solutions that track, analyze, and reduce carbon footprints across industries. Our mission is to empower businesses to adopt sustainable practices, ensuring a greener planet for future generations.
        </p>
        <div className="about-us-image">
          {/* Replace the src with the actual image path */}
          <img src="path-to-image.png" alt="Illustration of a person reading" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <div className="social-links">
          <a href="#"><i className="fab fa-facebook"></i> Facebook</a>
          <a href="#"><i className="fab fa-facebook-messenger"></i> Messenger</a>
          <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
        </div>
        <p>© 2024 Sustainability Footprint Management. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;