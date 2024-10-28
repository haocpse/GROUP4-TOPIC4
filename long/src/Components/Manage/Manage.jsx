import React from "react";
import './Manage.css';
import { Link, NavLink } from "react-router-dom";

const Manage = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <div className="d-flex flex-column p-3 bg-dark sidebar" style={{ width: '90px', height: 'auto' }}>
            <p style={{ color: 'white', fontSize: '20px' }}>Koi Pond Design</p>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {/* Home */}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link text-dark d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-house-chimney"></i>
                    </NavLink>
                </li>
                {/* Request */}
                <li className="nav-item">
                    <NavLink to="/manage/request" className="nav-link d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-bell"></i>
                    </NavLink>
                </li>
                {/* Maintenance Requests */}
                <li className="nav-item">
                    <NavLink to="/manage/maintenance-request" className="nav-link d-flex align-items-center sidebar-link">
                        <i class="fa-solid fa-shield-heart"></i>
                    </NavLink>
                </li>
                {/* Approve Quotation */}
                <li className="nav-item">
                    <NavLink to="/manage/quotations" className="nav-link d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-money-bill"></i>
                    </NavLink>
                </li>
                 {/* Approve Quotation Maintenance*/}
                <li className="nav-item">
                    <NavLink to="/manage/maintenance-quotations" className="nav-link d-flex align-items-center sidebar-link">
                        <i class="fi fi-rr-ballot-check"></i>
                    </NavLink>
                </li>
                {/* Approve Desing */}
                <li className="nav-item">
                    <NavLink to="/manage/designs" className="nav-link  d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-pen"></i>
                    </NavLink>
                </li>
                {/* View Construction Progress */}
                <li className="nav-item">
                    <NavLink to="/manage/viewProgress" className="nav-link  d-flex align-items-center sidebar-link">
                        <i class="fa-solid fa-person-digging"></i>
                    </NavLink>
                </li>
                {/* View Payment */}
                <li className="nav-item">
                    <NavLink to="/manage/viewPayment" className="nav-link  d-flex align-items-center sidebar-link">
                        <i class="fa-solid fa-dollar-sign"></i>
                    </NavLink>
                </li>
                {/* Dashboard */}
                <li className="nav-item mb-4">
                    <NavLink to="/manage/dashboard" className="nav-link text-dark align-items-center sidebar-link">
                        <i className="fa-solid fa-table-list"></i>
                    </NavLink>
                </li>
                <hr className="mb-3" />
                {/* Logout */}
                <li className="nav-item">
                    <button onClick={handleLogout} className="nav-link d-flex align-items-center sidebar-link bg-transparent border-0">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </li>
            </ul>

        </div>
    );
}

export default Manage;