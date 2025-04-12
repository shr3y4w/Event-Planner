import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Events from './pages/EventsPage';
import ManageEvents from './pages/ManageEvents';
import Login from './pages/LoginPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EventDetailPage from './pages/EventDetailPage'; // NEW
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Navbar /> {/* Visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetailPage />} /> {/* NEW */}
        <Route path="/manage-events" element={<ManageEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
