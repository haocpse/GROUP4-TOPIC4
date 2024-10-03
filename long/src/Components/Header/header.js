import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [navigationLinks, setNavigationLinks] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchNavigationLinks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/navigation");
        const data = await response.json();
        setNavigationLinks(data);
      } catch (error) {
        console.error("Error fetching navigation links:", error);
      }
    };

    fetchNavigationLinks();
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img
          alt="Koi Pond Design Logo"
          height="50"
          src="https://gudlogo.com/wp-content/uploads/2019/05/logo-ca-Koi-23.png"
          width="50"
        />
        <span>Koi Pond Design</span>
      </div>
      <nav className="nav">
        <a className="active" href="#">
          Main
        </a>
        <a href="#">Projects</a>
        <a href="#">Blog</a>
        <a href="#">Contacts</a>
        <a href="#">About Us</a>
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
