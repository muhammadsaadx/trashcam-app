import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Area,
  LabelList 
} from "recharts";
import "leaflet/dist/leaflet.css";
import styles from "./dashboard.styles";
import config from "../../config/config";
import Sidebar from "../../layout/sidebar/sidebar";

const MapLayout = ({ data }) => {
  const map = useMap();

  useEffect(() => {
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
    fetchData("get_all_report_dates", setLitterRateData);
    fetchData("get_longitude_latitude", setLitterLocationData);
  }, []);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}/dashboard/${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <header style={styles.dashboardHeader}>
        <h3>Dashboard</h3>
      </header>
      <div style={styles.dashboardContent}>
        {/* Line Chart Section */}
        <div style={styles.chartRow}>
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h2 style={styles.headerText}>Monthly Litter Count (Line)</h2>
              <div style={styles.dropdownContainer}>
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
            </div>
            
            <div style={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={litterRateData[selectedYear] || []}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#07715B" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#F4F0FF" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#aaa', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    domain={['auto', 'auto']}
                  />
                  <CartesianGrid 
                    vertical={false} 
                    horizontal={true}
                    strokeDasharray="3 3" 
                    stroke="#eee"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="none"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#07715B"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ 
                      r: 6, 
                      stroke: '#07715B', // Green border
                      strokeWidth: 2, 
                      fill: '#fff' // White fill
                    }}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-in-out"
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

        {/* Bar Chart Section */}
        <div style={styles.chartRow}>
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <h2 style={styles.headerText}>Monthly Litter Count (Bar)</h2>
              <div style={styles.dropdownContainer}>
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
            </div>
            
            <div style={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={litterRateData[selectedYear] || []}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="80%" stopColor="#07715B" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#07715B" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#aaa', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#aaa', fontSize: 12 }}
                    domain={['auto', 'auto']}
                  />
                  <CartesianGrid 
                    vertical={false} 
                    horizontal={true}
                    strokeDasharray="3 3" 
                    stroke="#eee"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="url(#barColor)"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                  >
                    <LabelList dataKey="count" position="top" style={{ fontSize: 10, fill: '#07715B' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <MapContainer
            id="map2"
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