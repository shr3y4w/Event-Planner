// pages/EventsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventList from '../components/EventList';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/events/');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;
