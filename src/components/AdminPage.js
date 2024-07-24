import React, { useEffect, useState } from 'react';
import AdCard from './AdCard';

// Administratoriaus puslapio komponentas
const AdminPage = () => {
  const [ads, setAds] = useState([]); // Skelbimų būsenos kintamasis
  const token = localStorage.getItem('token'); // JWT tokenas

  // useEffect kablys, kuris paleidžiamas komponentui užkraunant
  useEffect(() => {
    fetchAds(); // Iškviečiame funkciją skelbimų gavimui
  }, [token]);

  // Funkcija, skirta gauti visus skelbimus iš serverio
  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:5000/ads', {
        headers: { 'Authorization': `Bearer ${token}` } // Pridedame Authorization header
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      const data = await response.json(); // Gauname skelbimus JSON formatu
      setAds(data); // Nustatome gautus skelbimus būsenos kintamajam
    } catch (err) {
      console.error('Failed to fetch ads:', err);
    }
  };

  // Funkcija, skirta ištrinti skelbimą
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/ads/${id}`, {
        method: 'DELETE', // Naudojame DELETE metodą
        headers: {
          'Authorization': `Bearer ${token}` // Pridedame Authorization header
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
      setAds(ads.filter(ad => ad._id !== id)); // Pašaliname ištrintą skelbimą iš būsenos
      alert('Ad deleted successfully'); // Pranešame apie sėkmingą ištrynimą
    } catch (error) {
      console.error('Failed to delete ad:', error);
      alert('Failed to delete ad');
    }
  };

  return (
    <div className="container">
      <h2>Admin - Manage Ads</h2>
      <div className="ad-list">
        {ads.map(ad => (
          <div key={ad._id} className="ad-card-wrapper">
            <AdCard ad={ad} /> {/* Skelbimo kortelės komponentas */}
            <div className="ad-card-actions">
              <button className="delete-button" onClick={() => handleDelete(ad._id)}>Delete</button> {/* Ištrynimo mygtukas */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
