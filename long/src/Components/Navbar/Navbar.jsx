import React, { useEffect, useState } from "react";
import logo from '../Assests/logo-navbar.png'
import './Navbar.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
    const [role, setRole] = useState('');
    const [isLogined, setIsLogined] = useState(false);

    useEffect(() => {
        const fecthRole = async () => {
            try {
                const response = await axios.get('http://localhost:8080/role');
                setRole(response.data.data)
                setIsLogined(true)
            } catch (error) {
                console.log("fetchRole FAIL ^^", error)
                toast.error("Fail fetching Role! ^^")
                setIsLogined(false)
            }

        }
        fecthRole()
    }, [])

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
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
                    <li><Link to="/main">MAIN</Link></li>
                    <li><Link to="/project">PROJECTS</Link></li>
                    <li><Link to="/service">SERVICE</Link></li>
                    <li><Link to="/contact">CONTACT</Link></li>
                    <li><Link to="/blog">BLOG</Link></li>
                    <li><Link to="/about-us">ABOUT US</Link></li>

                    {isLogined ? (
                        role === 'customer' ? (
                            <li><Link to="/profile"><i className="fa-solid fa-user"></i></Link></li>
                        ) : role === 'consultant' ? (
                            <li><Link to="/consult/ownedTasks"><i className="fa-solid fa-user"></i></Link></li>
                        ) : role === 'designer' ? (
                            <li><Link to="/design/ownedTasks"><i className="fa-solid fa-user"></i></Link></li>
                        ) : role === 'manager' ? (
                            <li><Link to="/manage"><i className="fa-solid fa-user"></i></Link></li>
                        ) : role === 'constructor' ? (
                            <li><Link to="/construct/ownedTasks"><i className="fa-solid fa-user"></i></Link></li>
                        ) : role === null ? (
                            <li className="highlight-login"><Link to="/login">LOGIN</Link></li>
                        ) : null
                    ) : (
                        <li className="highlight-login"><Link to="/login">LOGIN</Link></li>
                    )}

                </ul>
            </nav>
        </>
    );
};
export default Navbar;