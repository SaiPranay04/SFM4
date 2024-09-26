import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './SignUp.css'; // Assuming your styles are here

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/signup', formData);
            console.log('User created:', response.data);
            alert('User created successfully');
        } catch (err) {
            console.error('Error creating user:', err);
            alert('Error creating user');
        }
    };

    return (
        <div className="signup-container">
            <div className="logo">
                <img src="path-to-your-logo-image.jpg" alt="Sustainability Footprint Management" />
            </div>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>

            <div className="or-separator">or</div>

            <button className="social-login google">Continue with Google</button>
            <button className="social-login facebook">Continue with Facebook</button>

            <p>Already have an account? <a href="/Loginsignup">Log in</a></p>
        </div>
    );
};

export default SignUp;
