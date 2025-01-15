import React from 'react';
import { useNavigate } from 'react-router-dom';
import './entrance.css';
import BackgroundImage from '../assets/entrance.png';

function Entrance() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/home');
  };

  return (
    <div className="entrance">
      <div className="overlay">
        <h1>Your Dream Trip Awaits</h1>
        <p>Discover your next adventure with our curated selection of hotels and destinations.</p>
        <button onClick={handleButtonClick}>Search Hotels</button>
      </div>
    </div>
  );
}

export default Entrance;
