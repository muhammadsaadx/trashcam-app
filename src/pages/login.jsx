import React, { useState } from 'react';
import '../css/login.css';
import loginBackground from '../assests/images/LoginBackground.png';
import config from '../config/config'; // Using config for API_BASE_URL

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Using API_BASE_URL from config
  const API_BASE_URL = config.API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  return (
    <div className="login-container">
      <img src={loginBackground} alt="TrashCamLoginBackground" className="login-background" />
      <div className="login-form">
        <div className="sidebar-logo">
          <img src="/logo.svg" alt="TrashCam Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
