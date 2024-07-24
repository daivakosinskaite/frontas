import React, { useEffect, useState } from 'react';
import AdCard from './AdCard';

const Home = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAds(); // Inicializuoja skelbimų sąrašą
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:5000/ads');
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const data = await response.json();
      setAds(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch ads:', err);
    }
  };

  return (
    <div className="ad-list">
      {error && <div className="error">{error}</div>}
      {ads.map(ad => (
        <div key={ad._id} className="ad-card-wrapper">
          <AdCard ad={ad} />
        </div>
      ))}
    </div>
  );
};

export default Home;
