import React from 'react';

function HotelCard({ name, price, location }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Konum: {location}</p>
      <p>Fiyat: {price} TL</p>
    </div>
  );
}

export default HotelCard;
