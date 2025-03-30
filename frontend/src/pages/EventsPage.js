import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Unauthorized. Please login first.');
        window.location.href = '/';
        return;
      }
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/events/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{new Date(event.date_time).toLocaleString()}</p>
            <p>Location: {event.location}</p>
            <p>Seats Available: {event.available_seats}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
