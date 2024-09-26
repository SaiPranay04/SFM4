import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';
import './Loginsignup.css'; // Assuming your styles are in Loginsignup.css

const Loginsignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            console.log('Logged in:', response.data);
            alert('Logged in successfully');
            navigate('/dashboard');
            // Save token to local storage or handle it as needed
        } catch (err) {
            console.error('Login error:', err);
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Welcome back!</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="name@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="reset-link">Reset password</a>
                    </div>
                    <button type="submit" className="sign-in-btn">Sign in</button>
                </form>
                <p>
                    Don’t have an account? <Link to="/SignUp" className="sign-up-link">Sign up</Link>
                </p>
                <div className="separator">or</div>
                <button className="social-btn google-btn">Continue with Google</button>
                <button className="social-btn twitter-btn">Continue with Twitter</button>
            </div>
        </div>
    );
};

export default Loginsignup;
