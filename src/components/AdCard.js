import React from 'react';

// Skelbimo kortelės komponentas
const AdCard = ({ ad }) => {
  return (
    <div className="ad-card">
      {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} />} {/* Jei yra paveikslėlis, jis rodomas */}
      <div className="ad-info">
        <h3>{ad.title}</h3> {/* Skelbimo pavadinimas */}
        <p>{ad.price}</p> {/* Skelbimo kaina */}
        <p>{ad.city}</p> {/* Skelbimo miestas */}
      </div>
    </div>
  );
};

export default AdCard;
