import React, { useState, useEffect } from 'react';
import './admin_dashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Strapi'den kullanıcı verilerini çekmek için
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
    // API çağrısı eklenebilir
  };

  const handleView = (id) => {
    console.log(`View user with ID: ${id}`);
    // Kullanıcı detayları için yönlendirme yapılabilir
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <img src="/hf.png" alt="Admin Logo" />
        </div>
        <input type="text" placeholder="Search Here" className="dashboard-search" />
        <div className="dashboard-user">Admin signed in</div>
      </header>

      <main className="dashboard-main">
        <h1 className="dashboard-title">User Management</h1>
        <div className="dashboard-listings">
          {users.map((user) => (
            <div className="listing-row" key={user.id}>
              <span className="listing-name">{user.username}</span>
              <button
                className="button delete"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
              <button
                className="button view"
                onClick={() => handleView(user.id)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
