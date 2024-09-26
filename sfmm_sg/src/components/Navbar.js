import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 50) {
            setNav(true);
        } else {
            setNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('scroll', changeBackground);
        };
    }, []);

    return (
        <nav className={nav ? "nav-active" : "nav"}>
            <input className="menu-btn" type="checkbox" id="menu-btn" />
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="nav-icon"></span>
            </label>
            <ul className="menu">
                <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></li>
                <li><Link to="/contact"><i className="fas fa-envelope"></i> Contact</Link></li>
                <li><Link to="/loginsignup"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
                <li><Link to="/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;