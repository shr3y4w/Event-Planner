// components/EventList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = ({ events }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li
          key={event.id}
          onClick={() => handleClick(event.id)}
          className="border p-4 rounded cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">📍 {event.location}</p>
          <p className="text-sm text-gray-600">🕒 {new Date(event.date_time).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
