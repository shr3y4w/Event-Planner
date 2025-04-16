import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-white fs-2">Event Planner</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* Always visible when logged in or out */}
            <li className="nav-item">
              <Link to="/" className={`nav-link btn rounded-pill ${location.pathname === '/' ? 'btn-primary' : 'btn-light'}`}>Home</Link>
            </li>

            <li className="nav-item">
              <Link to="/events" className={`nav-link btn rounded-pill ${location.pathname === '/events' ? 'btn-primary' : 'btn-light'}`}>Events</Link>
            </li>

            {/* Only for event planners */}
            {token && role === 'event_planner' && (
              <li className="nav-item">
                <Link to="/manage-events" className={`nav-link btn rounded-pill ${location.pathname === '/manage-events' ? 'btn-primary' : 'btn-light'}`}>Manage Events</Link>
              </li>
            )}

            {/* Auth Links */}
            {!token ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link btn rounded-pill btn-light">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link btn rounded-pill btn-light">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light ms-2 rounded-pill">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
