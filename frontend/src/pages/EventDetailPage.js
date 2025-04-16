import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login to view event details.');
      navigate('/login');
      return;
    }

    const fetchEventAndOtherEvents = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const currentEvent = response.data;
        setEvent(currentEvent);

        const otherRes = await axios.get(
          `http://127.0.0.1:8000/api/events/?created_by=${currentEvent.created_by}`
        );

        const other = otherRes.data.filter((ev) => ev.id !== currentEvent.id);
        setOtherEvents(other);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        alert('Could not fetch event. It may not exist or you may not have access.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndOtherEvents();
  }, [id, navigate]);

  const handleBooking = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/bookings/',
        { event: event.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking successful!");
      setQrCode(res.data.qr_code);

      const updatedEvent = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvent(updatedEvent.data);
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="mb-2">{event.description}</p>
      <p className="mb-1"><strong>Date & Time:</strong> {new Date(event.date_time).toLocaleString()}</p>
      <p className="mb-1"><strong>Location:</strong> {event.location}</p>
      <p className="mb-1"><strong>Seats Available:</strong> {event.available_seats}</p>
      <p className="mb-1"><strong>Price:</strong> ₹{event.price}</p>

      {event.created_by && (
        <p className="mt-2 text-sm text-gray-600">
          <strong>Organized By:</strong>{' '}
          <Link to={`/organizer/${event.created_by}`} className="text-blue-600 hover:underline">
            {event.created_by}
          </Link>
        </p>
      )}

      <button
        onClick={handleBooking}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Now
      </button>

      {qrCode && (
        <div className="mt-4">
          <h3 className="font-semibold">Your QR Code:</h3>
          <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mt-2 border p-2" />
        </div>
      )}

      {otherEvents.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Other Events by {event.created_by}</h3>
          <ul className="space-y-2">
            {otherEvents.map((ev) => (
              <li key={ev.id} className="text-blue-500 hover:underline">
                <Link to={`/events/${ev.id}`}>{ev.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
