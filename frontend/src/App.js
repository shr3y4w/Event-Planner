import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Events from './pages/EventsPage';
import ManageEvents from './pages/ManageEvents';
import Login from './pages/LoginPage';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import EventDetailPage from './pages/EventDetailPage';
import QRScanner from './pages/QRScanner'; // ✅ NEW
import OrganizerEvents from './pages/OrganizerEvents'; // ✅ NEW
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/manage-events" element={<ManageEvents />} />
        <Route path="/scan" element={<QRScanner />} /> {/* ✅ QR scanner route */}
        <Route path="/organizer/:username" element={<OrganizerEvents />} /> {/* ✅ Organizer-specific events */}
      </Routes>
    </Router>
  );
}

export default App;

