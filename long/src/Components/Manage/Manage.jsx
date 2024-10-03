import React from "react";
import './Manage.css';
import logo from '../Assests/logo-navbar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const Manage = () => {
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
                            <li><Link to="/manage/consultation" className="nav-link text-dark">Consultation</Link></li>
                            <li><Link to="/manage/design" className="nav-link text-dark">Design</Link></li>
                            <li><Link to="/manage/construction" className="nav-link text-dark">Construction</Link></li>
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
                            <li><Link to="/manage/consultation" className="nav-link text-dark">Consultation</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link text-dark d-flex align-items-center"
                        data-bs-toggle="collapse"
                        href="#approve"
                        role="button"
                        aria-expanded="false"
                        aria-controls="approve">

                        Approve Request
                    </a>
                    <div className="collapse" id="approve">
                        <ul className="nav flex-column ms-4">
                            <li><Link to="/manage/approve-quotation" className="nav-link text-dark">Aprrove Quotation</Link></li>
                            <li><Link to="/manage/approve-design" className="nav-link text-dark">Aprrove Design</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Manage;