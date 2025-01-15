import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestAPI = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Strapi API'sine istek gönder
        const response = await axios.get('http://localhost:1337/api/hotels');
        console.log('API Response:', response.data.data); // Gelen veriyi konsola yazdır
        setData(response.data.data); // Veriyi state'e kaydet
      } catch (err) {
        setError('Veri alınırken bir hata oluştu');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Otel Listesi</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {data.map((hotel) => (
            <li key={hotel.id}>
              <h2>{hotel.name || 'Bilinmeyen Otel'}</h2>
              <p><strong>Konum:</strong> {hotel.location || 'Belirtilmemiş'}</p>
              <p><strong>Fiyat:</strong> {hotel.price ? `${hotel.price} TL` : 'Belirtilmemiş'}</p>
              <p>
                <strong>Açıklama:</strong> {hotel.description?.[0]?.children?.[0]?.text || 'Açıklama yok'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestAPI;
