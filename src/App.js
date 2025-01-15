import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entrance from './pages/entrance';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import HotelOwnerDashboard from './pages/hotel_owner_dashboard'; 
import AdminDashboard from './pages/admin_dashboard';
import TestAPI from './pages/TestAPI';
import HotelDetail from './pages/hotel_detail'; 
import CustomerProfile from './pages/customer_profile'; // Customer Profile sayfasını ekliyoruz

function App() {
  return (
    <Router>
      <Routes>
        {/* Mevcut rotalar */}
        <Route path="/" element={<Entrance />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel_owner_dashboard" element={<HotelOwnerDashboard />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />

        {/* TestAPI rotası */}
        <Route path="/test" element={<TestAPI />} />

        {/* Dinamik Otel Detay Sayfası */}
        <Route path="/hotel/:id" element={<HotelDetail />} />

        {/* Customer Profile Sayfası */}
        <Route path="/customer_profile" element={<CustomerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
