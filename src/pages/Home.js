import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import HomeNavbar from "./home_navbar";

function extractPlainText(description) {
  if (!description || !Array.isArray(description)) {
    return "No Description Available";
  }
  return description
    .map((desc) =>
      desc.children
        ? desc.children.map((child) => child.text).join("")
        : ""
    )
    .join(" ");
}

function Home() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // API URL'sini çevresel değişkenlerden al
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:1337";

    fetch(`${apiUrl}/api/hotels?populate=*`) // API çağrısı
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setHotels(data.data || []);
      })
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <div className="home">
      <HomeNavbar />
      <div className="trending-section">
        <h2>Available Hotels</h2>
        <div className="hotel-list">
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div
                className="hotel-card"
                key={hotel.id}
                onClick={() => handleCardClick(hotel.id)}
              >
                {/* Otel Adı */}
                <h3>{hotel.attributes.name || "No Name Available"}</h3>

                {/* Otel Fotoğrafı */}
                {hotel.attributes.photos?.[0]?.url ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${hotel.attributes.photos[0].url}`}
                    alt={hotel.attributes.name || "Hotel Image"}
                    className="hotel-image"
                  />
                ) : (
                  <p>No Image Available</p>
                )}

                {/* Açıklama */}
                <p>{extractPlainText(hotel.attributes.description)}</p>

                {/* Fiyat */}
                <p>${hotel.attributes.price || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No hotels available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
