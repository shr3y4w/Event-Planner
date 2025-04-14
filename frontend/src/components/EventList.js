import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventList = ({ events }) => {
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/events/${id}`);
  };

  const handleOrganizerClick = (username) => {
    navigate(`/organizer/${username}`);
  };

  return (
    <ul className="space-y-4">
      {events.map((event) => (
        <li
          key={event.id}
          onClick={() => handleEventClick(event.id)}
          className="border p-4 rounded cursor-pointer hover:bg-gray-100"
        >
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">📍 {event.location}</p>
          <p className="text-sm text-gray-600">🕒 {new Date(event.date_time).toLocaleString()}</p>
          
          

          {event.created_by && (
            <p className="text-sm text-gray-700">
              <strong>Organizer:</strong>{' '}
              <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOrganizerClick(event.created_by);
                }}
              >
                {event.created_by}
              </span>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EventList;
