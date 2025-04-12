import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Navbar Section
      <nav style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
        <Link to="/" style={{ margin: '0 15px' }}>Home</Link>
        <Link to="/login" style={{ margin: '0 15px' }}>Login</Link>
        <Link to="/register" style={{ margin: '0 15px' }}>Register</Link>
        <Link to="/events" style={{ margin: '0 15px' }}>Events</Link>
      </nav> */}

      {/* Main Content Section */}
      <h1>Welcome to the Event Planner!</h1>
      <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get started.</p>
    </div>
  );
};

export default Home;
