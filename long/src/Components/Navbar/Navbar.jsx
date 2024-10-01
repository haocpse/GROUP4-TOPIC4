import React from "react";
import logo from '../Assests/logo-navbar.png'
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (<nav className="navbar">
        <div className="logo-text">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="text">
                <div>KOI</div>
                <div>POND</div>
                <div>DESIGN</div>
            </div>
        </div>
        <ul className="ul-navbar">
            <li><Link to="/main">MAIN</Link></li>
            <li><Link to="/project">PROJECTS</Link></li>
            <li><Link to="/service">SERVICE</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/blog">BLOG</Link></li>
            <li><Link to="/about-us">ABOUT US</Link></li>
        </ul>
    </nav>);
};
export default Navbar;