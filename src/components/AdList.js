import React, { useEffect, useState } from 'react';
import AdCard from './AdCard';

const AdList = () => {
  const [ads, setAds] = useState([]);
  const isAdmin = localStorage.getItem('role') === 'admin';

  useEffect(() => {
    fetch('http://localhost:5000/ads')
      .then(res => res.json())
      .then(data => setAds(data))
      .catch(err => console.error('Failed to fetch ads:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/ads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      setAds(ads.filter(ad => ad._id !== id));
    } catch (error) {
      console.error('Failed to delete ad:', error);
    }
  };

  return (
    <div className="ad-list">
      {ads.map(ad => (
        <div key={ad._id} className="ad-card-wrapper">
          <AdCard ad={ad} />
          {isAdmin && (
            <div className="ad-card-actions">
              <button className="delete-button" onClick={() => handleDelete(ad._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdList;
