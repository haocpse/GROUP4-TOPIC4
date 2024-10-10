import React from "react";
import './ConsultationPage.css';
import logo from '../Assests/logo-navbar.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

const ConsultationPage = () => {
    return (
        
        <div className="d-flex flex-column p-3 bg-light border-end" style={{ width: '250px', height: '100vh' }}>
            {/* Logo and Header */}
            <Link to="/main" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none text-dark">
                <img src={logo} alt="Logo" className="img-fluid me-2" style={{ width: '30px' }} />
                <span className="fs-4 fw-bold">Consultation</span>
            </Link>
            <hr />

            {/* Navigation List */}
            <ul className="nav nav-pills flex-column mb-auto">
                {/* Consultation Section */}
                <li className="nav-item">
                    <a
                        className="nav-link text-dark d-flex align-items-center justify-content-between"
                        data-bs-toggle="collapse"
                        href="#consultation"
                        role="button"
                        aria-expanded="false"
                        aria-controls="consultation"
                    >
                        <span>Consultation</span>
                        <i className="bi bi-chevron-down"></i>
                    </a>
                    <div className="collapse" id="consultation">
                        <ul className="nav flex-column ms-3">
                            <li className="nav-item">
                                <Link to="/list-quotation" className="nav-link text-secondary ps-4">
                                    List Quotation
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="consult/ownedTasks/:constructionOrderId" className="nav-link text-secondary ps-4">
                                    Quotation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>

                {/* Task Section */}
                <li className="nav-item mt-2">
                    <a
                        className="nav-link text-dark d-flex align-items-center justify-content-between"
                        data-bs-toggle="collapse"
                        href="#maintenance"
                        role="button"
                        aria-expanded="false"
                        aria-controls="maintenance"
                    >
                        <span>Task</span>
                        <i className="bi bi-chevron-down"></i>
                    </a>
                    <div className="collapse" id="maintenance">
                        <ul className="nav flex-column ms-3">
                            <li className="nav-item">
                                <Link to="/consult/ownedTasks" className="nav-link text-secondary ps-4">
                                    Task
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ConsultationPage;

