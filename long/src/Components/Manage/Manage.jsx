import React from "react";
import './Manage.css';
import { Link } from "react-router-dom";

const Manage = () => {
    return (
        <div className="d-flex flex-column p-3 bg-dark sidebar" style={{ width: '90px', height: '150vh' }}>
            <p style={{ color: 'white', fontSize: '20px' }}>Koi Pond Design</p>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                {/* Home */}
                <li className="nav-item">
                    <Link to="/" className="nav-link text-dark d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-house-chimney"></i>

                    </Link>
                </li>
                {/* Construction Request - từng phần riêng biệt */}
                <li className="nav-item">
                    <Link to="/manage/consultation" className="nav-link d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-bell"></i>
                    </Link>
                </li>
                {/* Approve Request */}
                <li className="nav-item">
                    <Link to="/manage/approve-quotation" className="nav-link d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-money-bill"></i>
                    </Link>
                </li>
                {/* Approve Desing */}
                <li className="nav-item">
                    <Link to="/manage/approve-design" className="nav-link  d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-pen"></i>
                    </Link>
                </li>
                {/* Dashboard */}
                <li className="nav-item mb-4">
                    <Link to="/manage/dashboard" className="nav-link text-dark align-items-center sidebar-link">
                        <i className="fa-solid fa-table-list"></i>
                    </Link>
                </li>
                <hr className="mb-3" />
                {/* Logout */}
                <li className="nav-item">
                    <Link to="/" className="nav-link  d-flex align-items-center sidebar-link">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </Link>
                </li>
            </ul>

        </div>
    );
}

export default Manage;