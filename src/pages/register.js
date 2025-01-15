import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate hook'unu ekliyoruz
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // useNavigate hook'u

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API URL'sini .env dosyasından alıyoruz
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";

      const response = await axios.post(`${apiUrl}/api/auth/local/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.jwt); // Token'ı kaydediyoruz
      setMessage(`Registration successful! Welcome, ${response.data.user.username}.`);
      navigate("/home"); // Kayıt başarılı olduğunda yönlendirme
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Register</h1>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
