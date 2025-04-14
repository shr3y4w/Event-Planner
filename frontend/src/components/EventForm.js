import React, { useState, useEffect } from 'react';

function EventForm({ event, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_time: '',
    location: '',
    available_seats: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        date_time: event.date_time || '',
        location: event.location || '',
        available_seats: event.available_seats || '',
        created_by: event.created_by || '',
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        name="date_time"
        type="datetime-local"
        value={formData.date_time}
        onChange={handleChange}
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <input
        name="available_seats"
        type="number"
        placeholder="Available Seats"
        value={formData.available_seats}
        onChange={handleChange}
        required
      />

      {/* ✅ Read-only field showing who created the event */}
      {event && event.created_by && (
        <input
          name="created_by"
          value={`Created by: ${event.created_by.username || event.created_by}`}
          disabled
          readOnly
        />
      )}

      <button type="submit">{event ? 'Update' : 'Create'} Event</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default EventForm;
