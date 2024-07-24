import React, { useEffect, useState } from 'react';
import AdCard from './AdCard';

const UserPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/ads')
      .then(res => res.json())
      .then(data => setAds(data));
  }, []);

  const handleRate = (id) => {
    fetch(`http://localhost:5000/ads/${id}/rate`, { method: 'POST' })
      .then(res => res.json())
      .then(updatedAd => {
        setAds(ads.map(ad => ad._id === id ? updatedAd : ad));
      });
  };

  return (
    <div className="container">
      <h2>Ads</h2>
      {ads.map(ad => (
        <AdCard key={ad._id} ad={ad} onRate={handleRate} />
      ))}
    </div>
  );
};

export default UserPage;
