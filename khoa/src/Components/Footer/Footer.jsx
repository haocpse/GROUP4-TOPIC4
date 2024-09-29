import React from "react";
import './Footer.css';
import logo from '../Assests/logo-navbar.png';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-5">
            <div className="container">
                <div className="row">
                    {/* Logo */}
                    <div className="col-md-3 text-center">
                        <img src={logo} alt="LOGO" className="footer-img mb-2" />
                        <p className="mb-1">KOI POND DESIGN</p>
                        <p>YOUR CHOICE YOUR HAPPY</p>
                    </div>

                    {/* Information */}
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Information</h5>
                        <ul className="list-unstyled">
                            <ul className="nav-links">
                                <li><Link to="/" className="text-light">Main</Link></li>
                                <li><Link to="/project" className="text-light">Project</Link></li>
                                <li><Link to="/service" className="text-light">Services</Link></li>
                                <li><Link to="/contact" className="text-light">Contact</Link></li>
                                <li><Link to="/blog" className="text-light">Blog</Link></li>
                                <li><Link to="/about-us" className="text-light">About Us</Link></li>
                            </ul>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Contacts</h5>
                        <p><i className="fas fa-map-marker-alt"></i> FPT UNIVERSITY</p>
                        <p><i className="fas fa-phone"></i> 999.999.9999</p>
                        <p><i className="fas fa-envelope"></i> koipondy@gmail.com</p>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Social Media</h5>
                        <ul className="list-inline">
                            <li className="list-inline-item"><Link to="#" className="text-light"><i className="fab fa-facebook"></i></Link></li>
                            <li className="list-inline-item"><Link to="#" className="text-light"><i className="fab fa-twitter"></i></Link></li>
                            <li className="list-inline-item"><Link to="#" className="text-light"><i className="fab fa-instagram"></i></Link></li>
                            <li className="list-inline-item"><Link to="#" className="text-light"><i className="fab fa-youtube"></i></Link></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center mt-4 pt-4 border-top border-secondary">
                    <p className="mb-0">&copy; 2024 All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );

}
export default Footer;