import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import styles from './dashboard.styles';
import config from "../../config/config";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [litterRateData, setLitterRateData] = useState({});

  const API_BASE_URL = config.API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dashboard/get_all_report_dates`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setLitterRateData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div style={styles.dashboard}>
      <header style={styles.dashboardHeader}>
        <h1>Dashboard</h1>
      </header>

      <div style={styles.dashboardContent}>
        <div style={styles.chartRow}>
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h2 style={styles.headerText}>Monthly Litter Count</h2>
              <select value={selectedYear} onChange={handleYearChange} style={styles.dropdown}>
                {Object.keys(litterRateData).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div style={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={litterRateData[selectedYear] || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" name="Litter Count" stroke="#07715B" activeDot={{ r: 8 }} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <MapContainer id="map" style={styles.mapContainer} center={[33.6844, 73.0479]} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
