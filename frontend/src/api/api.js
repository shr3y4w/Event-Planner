import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/users/login/', {
      username,
      password,
    });

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('role', response.data.role); // <-- Save the role here
    return true;
  } catch (error) {
    alert('Login failed. Please check your credentials.');
    return false;
  }
};


export const registerUser = async (username, email, password, role) => {
  try {
    await axios.post(`${API_URL}/users/register/`, { username, email, password, role });
    alert('Registration successful!');
    return true;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    return false;
  }
};

// 🔐 Authenticated axios instance for event operations
const authAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the access token
authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ EVENT APIs

// Fetch only the events created by the logged-in user
export const getMyEvents = () => authAxios.get('/events/?mine=true');

// Create a new event
export const createEvent = (data) => authAxios.post('/events/', data);

// Update an existing event
export const updateEvent = (id, data) => authAxios.put(`/events/${id}/`, data);

// Delete an event
export const deleteEvent = (id) => authAxios.delete(`/events/${id}/`);

export const getEventsByOrganizer = (username) =>
  axios.get(`${API_URL}/events/?created_by=${username}`);