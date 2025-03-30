// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/events" className="mr-4">Events</Link>
        {token && <Link to="/manage-events" className="mr-4">Manage Events</Link>}
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
