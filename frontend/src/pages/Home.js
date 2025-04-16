import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';  // We'll add styles here for positioning the video
import backgroundImage from './cal.jpg' ; 
const Home = () => {
  return (
    <div className="min-vh-100 d-flex flex-column position-relative" style={{ backgroundColor: '#ADD8E6' }}>

      {/* Background Video */}
      <div
        className="background-image position-absolute w-100 h-100"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>

      {/* Main Content Section */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1 position-relative z-index-2">
        <div className="text-center p-5 bg-dark text-white rounded shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          <h1 className="display-4 fw-bold mb-3">Welcome to Event Planner!</h1>
          <p className="lead mb-4">
            Please <Link to="/login" className="text-light fw-semibold">Login</Link> or{' '}
            <Link to="/register" className="text-light fw-semibold">Register</Link> to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
