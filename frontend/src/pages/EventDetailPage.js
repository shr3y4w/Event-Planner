import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('Please login to view event details.');
      navigate('/login');
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <p className="mt-2">{event.description}</p>
      <p>Date & Time: {new Date(event.date_time).toLocaleString()}</p>
      <p>Location: {event.location}</p>
      <p>Seats Available: {event.available_seats}</p>
    </div>
  );
};

export default EventDetailPage;
