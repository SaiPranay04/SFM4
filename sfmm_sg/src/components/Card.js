// src/components/Card.js
import React from 'react';
import './Card.css'; // Ensure this file exists and is correctly styled

const Card = ({ title, value, children }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
      {children}
    </div>
  );
};

export default Card;
