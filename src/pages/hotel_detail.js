import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./hotel_detail.css";

function HotelDetail() {
  const { id } = useParams(); // URL'den otel ID'sini al
  const [hotel, setHotel] = useState(null); // Otel verisi
  const [error, setError] = useState(false); // Hata kontrolü
  const [loading, setLoading] = useState(true); // Yüklenme durumu

  useEffect(() => {
    // Otel verilerini çek
    fetch("http://localhost:1337/api/hotels?populate=*")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("All Hotels Response:", data);
        // ID'yi eşleştir
        const foundHotel = data.data.find(
          (hotel) => hotel.id === parseInt(id, 10)
        );
        if (foundHotel) {
          setHotel(foundHotel); // Eşleşen oteli ayarla
          setError(false); // Hata yok
        } else {
          setError(true); // Hata var
        }
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setError(true); // Hata var
      })
      .finally(() => {
        setLoading(false); // Yüklenme tamamlandı
      });
  }, [id]);

  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  if (error || !hotel) {
    return <p>Error: Hotel not found or there was an error fetching the data.</p>;
  }

  return (
    <div className="hotel-detail-container">
      <h1>{hotel.name || "Hotel Name Unavailable"}</h1>
      {hotel.photos?.[0]?.url ? (
        <img
          src={`http://localhost:1337${hotel.photos[0].url}`}
          alt={hotel.name}
          className="hotel-detail-image"
        />
      ) : (
        <p>No Image Available</p>
      )}
      <p>{hotel.description?.[0]?.children?.[0]?.text || "No Description Available"}</p>
      <p>Price per Night: ${hotel.price || "N/A"}</p>
      <p>Location: {hotel.location || "Unknown"}</p>
    </div>
  );
}

export default HotelDetail;
