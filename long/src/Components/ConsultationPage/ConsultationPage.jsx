import React from "react";
import './ConsultationPage.css';
import logo from '../Assests/logo-navbar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const ConsultationPage = () => {
    return (
        <div className="d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
            <Link to="/main" className="d-flex align-items-center text-decoration-none">
                <span className="fs-4"><img src={logo} alt="Logo" className="img-manager me-2" />Consultation</span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a
                        className="nav-link text-dark d-flex align-items-center"
                        data-bs-toggle="collapse"
                        href="#consultation"
                        role="button"
                        aria-expanded="false"
                        aria-controls="consultation">

                        Construction Request
                    </a>
                    <div className="collapse" id="consultation">
                        <ul className="nav flex-column ms-4">
                            <li><Link to="/Consultation-page/consultation-Request" className="nav-link text-dark">Consultation Request</Link></li>
                            <li><Link to="/Quotation-order" className="nav-link text-dark">Quotation Order</Link></li>

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
                            <li><Link to="/manage/Consultation" className="nav-link text-dark">Consultation</Link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default ConsultationPage;
