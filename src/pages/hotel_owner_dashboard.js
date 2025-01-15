import React, { useState, useEffect } from "react";
import "./hotel_owner_dashboard.css";

function HotelOwnerDashboard() {
  const [hotels, setHotels] = useState([]); // Otel listesi
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  // Kullanıcının otellerini çekme
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:1337/api/hotels?populate=*", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setHotels(data.data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  // Otel ekleme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formDataObj = new FormData();
    formDataObj.append("files.image", formData.image);
    formDataObj.append(
      "data",
      JSON.stringify({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
      })
    );

    try {
      const response = await fetch("http://localhost:1337/api/hotels", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });
      if (response.ok) {
        alert("Hotel added successfully!");
        setFormData({ name: "", description: "", price: "", image: null });
        window.location.reload(); // Sayfayı yenile
      } else {
        alert("Error adding hotel. Please try again.");
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Hotel Owner Dashboard</h1>
      <div className="hotels-section">
        <h2>Your Hotels</h2>
        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <h3>{hotel.attributes.name}</h3>
              <p>{hotel.attributes.description}</p>
              <p>${hotel.attributes.price}</p>
              {hotel.attributes.image && (
                <img
                  src={`http://localhost:1337${hotel.attributes.image.data.attributes.url}`}
                  alt={hotel.attributes.name}
                  className="hotel-image"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="add-hotel-section">
        <h2>Add a New Hotel</h2>
        <form onSubmit={handleSubmit} className="add-hotel-form">
          <input
            type="text"
            placeholder="Hotel Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <input
            type="file"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            required
          />
          <button type="submit" className="submit-button">
            Add Hotel
          </button>
        </form>
      </div>
    </div>
  );
}

export default HotelOwnerDashboard;
