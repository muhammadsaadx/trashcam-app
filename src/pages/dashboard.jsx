import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../css/dashboard.css';
import config from '../config/config';

const Data1 = [
  { "month": "Jun", "incidents": 1 },
  { "month": "Jul", "incidents": 2 },
  { "month": "Aug", "incidents": 2 },
  { "month": "Sep", "incidents": 1 },
  { "month": "Oct", "incidents": 2 },
  { "month": "Nov", "incidents": 2 },
  { "month": "Dec", "incidents": 2 }
];

const Data2 = [
  { "month": "Jun", "incidents": 5 },
  { "month": "Jul", "incidents": 4 },
  { "month": "Aug", "incidents": 3 },
  { "month": "Sep", "incidents": 7 },
  { "month": "Oct", "incidents": 6 },
  { "month": "Nov", "incidents": 5 },
  { "month": "Dec", "incidents": 3000 }
];

function Dashboard() {
  const [data, setData] = useState(Data1); // Initial data is Data1
  const [isToggled, setIsToggled] = useState(false); // State to handle the toggle

  const API_BASE_URL = config.API_BASE_URL;

  useEffect(() => {
    // Fetch litter data from backend (if necessary)
    axios.get(`${API_BASE_URL}/dashboard/litter-data`) // Replace with the correct API URL
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching litter data:", error);
      });
  }, [API_BASE_URL]);

  // Function to handle toggle change
  const handleToggleChange = () => {
    setIsToggled((prevState) => !prevState);
  };

  // Switch between Data1 and Data2 based on the toggle state
  useEffect(() => {
    if (isToggled) {
      setData(Data2);  // Set Data2 if toggle is on
    } else {
      setData(Data1);  // Set Data1 if toggle is off
    }
  }, [isToggled]); // Effect depends on the isToggled state

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-content">
        <div className="chart-row">
          <div className="chart-card">
            <div className="chart-header">
              <h2>Litter Rate</h2>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={isToggled} 
                  onChange={handleToggleChange} 
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="incidents" stroke="#06715A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
