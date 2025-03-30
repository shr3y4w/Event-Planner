import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login/`, { username, password });
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return true;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
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
