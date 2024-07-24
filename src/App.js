import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import MyAds from './components/MyAds';
import AddAdForm from './components/AddAdForm';
import Footer from './components/Footer';

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const handleLogin = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setRole('');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <nav>
        <h1>Market Board</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          {role === 'admin' ? (
            <>
              <li><Link to="/my-ads">My Ads</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : role ? (
            <>
              <li><Link to="/add-ad">Add Ad</Link></li>
              <li><Link to="/my-ads">My Ads</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/my-ads" element={<MyAds />} />
        <Route path="/add-ad" element={<AddAdForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
