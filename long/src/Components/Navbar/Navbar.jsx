import React, { useEffect, useState } from "react";
import logo from '../Assests/logo-navbar.png'
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
    const [isLogined, setIsLogined] = useState(false);
    const navigate = useNavigate(); 
    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            setIsLogined(true);
        }
    }, []);
    function getRoleFromToken() {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.scope || decodedToken.roles || decodedToken.authorities;
            return roles;
        }
        return null;
    }
    const handleClickProfile = () => {
        const roles = getRoleFromToken();
        if (roles === "MANAGER") {

            navigate('/manage')
        } else if (roles === "CONSULTANT") {

            navigate('/consult/ownedTasks')
        } else if (roles === "DESIGNER") {

            navigate('/design/ownedTasks')
        } else if (roles === "CONSTRUCTOR") {

            navigate('/construct/ownedTasks')
        } else if (roles === "CUSTOMER"){
            navigate('/myInfo/orders')
        } else {
            navigate('/login')
        }
    }

    return (

        <nav className="navbar">
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
                <li><Link to="/">MAIN</Link></li>
                <li><Link to="/project">PROJECTS</Link></li>
                <li><Link to="/service">SERVICE</Link></li>
                <li><Link to="/contact">CONTACT</Link></li>
                <li><Link to="/blog">BLOG</Link></li>
                <li><Link to="/about-us">ABOUT US</Link></li>
                {isLogined ? (
                    <li className="highlight-login"> <i className="fa-solid fa-user" onClick={handleClickProfile}/></li>
                ) : (
                    <li className="highlight-login"><Link to="/login">LOGIN</Link></li>
                )}
            </ul>
        </nav>

    );
};
export default Navbar;