import React from "react";
import './SideBar.css';
import logo from '../Assests/logo-navbar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const SideBar = () => {
    return (
        <div className="d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
            <Link to="/main" className="d-flex align-items-center text-decoration-none">
                <span className="fs-4"><img src={logo} alt="Logo" className="img-manager me-2" />Manager</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a
                        className="nav-link text-dark d-flex align-items-center"
                        data-bs-toggle="collapse"
                        href="#construction"
                        role="button"
                        aria-expanded="false"
                        aria-controls="construction">

                        Construction Request
                    </a>
                    <div className="collapse" id="construction">
                        <ul className="nav flex-column ms-4">
                            <li><Link to="/sidebar/consultation" className="nav-link text-dark">Consultation</Link></li>
                            <li><Link to="/sidebar/design" className="nav-link text-dark">Design</Link></li>
                            <li><Link to="/sidebar/construction" className="nav-link text-dark">Construction</Link></li>
                            <li><Link to="/sidebar/quotationOrder" className="nav-link text-dark">QuotationOrder</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link text-dark d-flex align-items-center"
                        data-bs-toggle="collapse"
                        href="#maintenance"
                        role="button"
                        aria-expanded="false"
                        aria-controls="maintenance">

                        Maintenance Request
                    </a>
                    <div className="collapse" id="maintenance">
                        <ul className="nav flex-column ms-4">
                            <li><Link to="/sidebar/Consultation" className="nav-link text-dark">Consultation</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;