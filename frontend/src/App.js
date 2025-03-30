import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Events from './pages/EventsPage';
import ManageEvents from './pages/ManageEvents';
import Login from './pages/LoginPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage Route - Redirect to Login */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* Events Page */}
        <Route path="/events" element={<Events />} />

        {/* Manage Events Page */}
        <Route path="/manage-events" element={<ManageEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
