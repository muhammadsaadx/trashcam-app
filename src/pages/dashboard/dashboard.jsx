import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "leaflet/dist/leaflet.css";
import styles from "./dashboard.styles";
import config from "../../config/config";

const MapLayout = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const heat = L.heatLayer(data, { radius: 30, blur: 15, maxZoom: 17 }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, data]);

  return null;
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [litterRateData, setLitterRateData] = useState({});
  const [litterLocationData, setLitterLocationData] = useState([]);

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/dashboard/${endpoint}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData("get_all_report_dates", setLitterRateData);
    fetchData("get_longitude_latitude", setLitterLocationData);
  }, []);

  return (
    <div style={styles.dashboard}>
      <header style={styles.dashboardHeader}>
        <h3>Dashboard</h3>
      </header>
      <div style={styles.dashboardContent}>
        <div style={styles.chartRow}>
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h2 style={styles.headerText}>Monthly Litter Count</h2>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(+e.target.value)}
                style={styles.dropdown}
              >
                {Object.keys(litterRateData).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={litterRateData[selectedYear] || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#07715B"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <MapContainer
            id="map"
            style={styles.mapContainer}
            center={[33.6844, 73.0479]}
            zoom={12}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <MapLayout data={litterLocationData} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
