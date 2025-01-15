import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./customer_profile.css"; // CSS dosyasını çağırıyoruz

function CustomerProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Kullanıcı bilgilerini al
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";

      fetch(`${apiUrl}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch profile information");
          }
          return response.json();
        })
        .then((data) => {
          setUserInfo(data); // Kullanıcı bilgilerini kaydet
        })
        .catch((error) => {
          console.error("Error fetching profile info:", error);
          navigate("/login"); // Profil yüklenemezse login sayfasına yönlendir
        });
    } else {
      navigate("/login"); // Token yoksa login sayfasına yönlendir
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Çıkış yaptıktan sonra login sayfasına yönlendir
  };

  return (
    <div className="profile-container">
      {userInfo ? (
        <>
          <div className="profile-header">
            <h1>Welcome, {userInfo.username}!</h1>
            <p>Email: {userInfo.email}</p>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CustomerProfile;
