import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Login komponentas, kuris leidžia vartotojams prisijungti
const Login = ({ onLogin }) => {
  // Būsenos laikymui naudojame useState hook'ą
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Formos pateikimo tvarkyklė
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Siunčiame prisijungimo užklausą į serverį
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      // Gauname atsakymą ir saugome tokeną bei rolę localStorage
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      onLogin(data.role);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

export default Login;
