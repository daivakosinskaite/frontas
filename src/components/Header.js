import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav>
      <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Market Board</Link></h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            {role === 'admin' ? (
              <li><Link to="/admin">Admin</Link></li>
            ) : (
              <>
                <li><Link to="/add-ad">Add Ad</Link></li>
                <li><Link to="/my-ads">My Ads</Link></li>
              </>
            )}
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
  );
};

export default Header;
