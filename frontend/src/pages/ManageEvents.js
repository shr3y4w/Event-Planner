import React, { useEffect, useState } from 'react';
import {
  getMyEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../api/api';
import EventForm from '../components/EventForm';

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await getMyEvents();
    setEvents(res.data);
  };

  const handleCreate = async (data) => {
    await createEvent(data);
    setShowForm(false);
    fetchEvents();
  };

  const handleUpdate = async (data) => {
    await updateEvent(selectedEvent.id, data);
    setSelectedEvent(null);
    setShowForm(false);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

  const toggleExpand = (id) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div className="manage-events">
      <h2>Manage Your Events</h2>

      <button
        onClick={() => {
          setShowForm(true);
          setSelectedEvent(null);
        }}
      >
        Create New Event
      </button>

      {showForm && (
        <EventForm
          event={selectedEvent}
          onSubmit={selectedEvent ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false);
            setSelectedEvent(null);
          }}
        />
      )}

      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ margin: '20px 0', borderBottom: '1px solid #ccc' }}>
            <div
              onClick={() => toggleExpand(event.id)}
              style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1em' }}
            >
              {event.title}
            </div>

            {expandedEventId === event.id && (
              <div style={{ marginTop: '10px' }}>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Date & Time:</strong> {new Date(event.date_time).toLocaleString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Available Seats:</strong> {event.available_seats}</p>
                <p><strong>Price:</strong> ₹{event.price}</p>
                <p><strong>Created By:</strong> {event.created_by?.username || event.created_by}</p>

                <button onClick={() => {
                  setSelectedEvent(event);
                  setShowForm(true);
                }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageEvents;