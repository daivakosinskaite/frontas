import React, { useState, useEffect } from 'react';

// AddAdForm komponentas, kuris naudojamas skelbimui pridėti arba atnaujinti
const AddAdForm = ({ ad, onSuccess }) => {
  // Skelbimo formos būsenos
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');

  // useEffect hook'as naudojamas nustatyti formos laukus, kai ad kinta
  useEffect(() => {
    if (ad) {
      setTitle(ad.title);
      setImageUrl(ad.imageUrl);
      setPrice(ad.price);
      setCity(ad.city);
    }
  }, [ad]);

  // Formos pateikimo tvarkyklė
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = ad ? `http://localhost:5000/ads/${ad._id}` : 'http://localhost:5000/ads';
    const method = ad ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, imageUrl, price, city })
      });

      if (!response.ok) {
        throw new Error('Failed to save ad');
      }

      alert('Ad saved successfully');
      onSuccess();
    } catch (error) {
      console.error('Error saving ad:', error);
      alert('Failed to save ad');
    }
  };

  return (
    <form className="add-ad-form" onSubmit={handleSubmit}>
      <h2>{ad ? 'Update Ad' : 'Add Ad'}</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button type="submit">{ad ? 'Update Ad' : 'Add Ad'}</button>
    </form>
  );
};

export default AddAdForm;
