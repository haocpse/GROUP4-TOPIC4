import React from "react";
import './ManageDesigner.module.css';
import { Link, NavLink } from "react-router-dom";

const ManageDesigner = () => {
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
                {/* Design */}
                <li className="nav-item">
                    <NavLink to="/design/ownedTasks" className="nav-link d-flex align-items-center sidebar-link mt-5 mb-3">
                    <i className="fa-solid fa-pen"></i>
                    </NavLink>
                </li>
                {/* Design */}
                <li className="nav-item">
                    <NavLink to="/design/designs" className="nav-link d-flex align-items-center sidebar-link mt-5 mb-3">
                    <i class="fa-solid fa-pencil"></i>
                    </NavLink>
                </li>
                <hr className="mb-3 mt-5" />
                {/* Logout */}
                <li className="nav-item">
                    <NavLink to="/" className="nav-link  d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </NavLink>
                </li>
            </ul>

        </div>
    );
}

export default ManageDesigner;