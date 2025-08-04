import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBackground from "../../assests/images/LoginBackground.png";
import config from "../../config/config";
import styles from "./login.styles"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = config.API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const fetched = await response.json();
        if (fetched.message === "Login successful") {
          navigate("/dashboard");
        } else {
          alert("Login failed");
        }
      } else {
        const error = await response.json();
        console.error("Login failed:", error);
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <img src={loginBackground} alt="TrashCamLoginBackground" style={styles.loginBackground} />
      <div style={styles.loginForm}>
        <div className="sidebar-logo">
          <img src="/logo.svg" alt="TrashCam Logo" style={styles.sidebarLogo} />
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Login</h2>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;