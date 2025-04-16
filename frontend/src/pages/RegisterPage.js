import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from './cal3.webp'; // Importing the image here

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
        username,
        email,
        password,
        role,
      });
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Registration failed. ' + (error.response?.data?.error || 'Please try again.'));
    }
  };

  return (
    <div className="register-container">
      {/* Top section with background image */}
      <div className="container-fluid p-0" style={{ backgroundImage: `url(${backgroundImage})`,
        
        backgroundSize: 'contain', height: '20vh' }}>
        {/* Background image is applied here inline */}
      </div>

      {/* Bottom section with blue background */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm border-0 rounded-3">
                <div className="card-body">
                  <h2 className="text-center">Register</h2>
                  {message && <p className="text-center text-danger">{message}</p>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="event_planner">Event Maker</option>
                      </select>
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-light">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
