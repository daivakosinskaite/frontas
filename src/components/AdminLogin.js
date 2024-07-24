import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AdminLogin komponentas, kuris leidžia administratoriui prisijungti
const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Formos pateikimo tvarkyklė
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Siunčiame prisijungimo užklausą į serverį
      const response = await fetch('http://localhost:5000/auth/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      // Gauname atsakymą ir saugome tokeną bei rolę localStorage
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      onLogin(data.role);
      alert('Admin login successful');
      navigate('/');
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Admin login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="centered-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
