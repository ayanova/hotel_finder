import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home_navbar.css";
import Logo from "../assets/hflogo.png";

function HomeNavbar() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // API URL'sini dinamik olarak al
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";

      fetch(`${apiUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          return response.json();
        })
        .then((data) => {
          setUsername(data.username);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  return (
    <div className="home-navbar">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      <div className="search-container">
        <input type="text" placeholder="Search Here" className="search-bar" />
      </div>

      <div className="auth-links">
        {username ? (
          <span
            className="username-link"
            onClick={() => navigate("/customer_profile")}
            style={{ cursor: "pointer", color: "#ffffff", textDecoration: "underline" }}
          >
            Welcome, {username}
          </span>
        ) : (
          <>
            <Link to="/login" className="auth-link">LOGIN</Link>
            <span>|</span>
            <Link to="/register" className="auth-link">REGISTER</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeNavbar;
