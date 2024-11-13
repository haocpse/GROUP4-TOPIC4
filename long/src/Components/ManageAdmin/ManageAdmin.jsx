import React from "react";
import './ManageAdmin.module.css';
import { Link, NavLink } from "react-router-dom";

const ManageAdmin = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <div className="d-flex flex-column p-3 bg-dark sidebar" style={{ width: '90px', height: '2000px' }}>
            <p style={{ color: 'white', fontSize: '20px' }}>Koi Pond Design</p>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {/* Home */}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link text-dark d-flex align-items-center sidebar-link mt-4">
                        <i className="fa-solid fa-house-chimney"></i>
                    </NavLink>
                </li>
                {/* Admin */}
                <li className="nav-item">
                    <NavLink to="packageConstruction" className="nav-link d-flex align-items-center sidebar-link mt-5 mb-3">
                        <i class="fa-solid fa-cube"></i>
                    </NavLink>
                </li>
                {/* Admin */}
                <li className="nav-item">
                    <NavLink to="packagePrice" className="nav-link d-flex align-items-center sidebar-link mt-5 mb-3">
                        <i class="fa-solid fa-user-secret"></i>
                    </NavLink>
                </li>
                <hr className="mb-3 mt-5" />
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

export default ManageAdmin;