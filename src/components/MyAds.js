import React, { useEffect, useState, useCallback } from 'react';
import AdCard from './AdCard';
import AddAdForm from './AddAdForm';

// MyAds komponentas rodo vartotojo skelbimus ir leidžia juos atnaujinti ar ištrinti
const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [editingAd, setEditingAd] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // useCallback naudojamas apibrėžti fetchAds funkciją, kad ji nebūtų sukurta kiekvieno renderio metu
  const fetchAds = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/ads/my-ads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const data = await response.json();
      setAds(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch ads:', err);
    }
  }, [token]);

  // useEffect hook'as kviečia fetchAds funkciją tik kai token kinta
  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  // Funkcija skelbimui ištrinti
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/ads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      setAds(ads.filter(ad => ad._id !== id));
      alert('Ad deleted successfully');
    } catch (error) {
      setError(error.message);
      console.error('Failed to delete ad:', error);
      alert('Failed to delete ad');
    }
  };

  // Funkcija skelbimui redaguoti
  const handleUpdate = (ad) => {
    setEditingAd(ad);
  };

  // Funkcija iškviečiama sėkmingai atnaujinus skelbimą
  const handleUpdateSuccess = () => {
    setEditingAd(null);
    fetchAds();
  };

  return (
    <div className="ad-list-page">
      <h2>My Ads</h2>
      {error && <div className="error">{error}</div>}
      {editingAd ? (
        <AddAdForm ad={editingAd} onSuccess={handleUpdateSuccess} />
      ) : (
        <div className="ad-list">
          {ads.map(ad => (
            <div key={ad._id} className="ad-card-wrapper">
              <AdCard ad={ad} />
              <div className="ad-card-actions">
                <button className="update-button" onClick={() => handleUpdate(ad)}>Update</button>
                <button className="delete-button" onClick={() => handleDelete(ad._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;
