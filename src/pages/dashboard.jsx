import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import '../css/dashboard.css';

const Dashboard = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [hotPoints, sethotPoints] = useState([]);

  useEffect(() => {
    fetchHotPoints();
  }, []);


  useEffect(() => {
    fetchData(selectedYear);
  }, [selectedYear]);


  const fetchData = async (year) => {
    try {
      const [yearsData, litterData] = await Promise.all([
        axios.get(`${config.API_BASE_URL}/dashboard/get_list_of_years`),
        axios.get(`${config.API_BASE_URL}/dashboard/get_litter_data`, { params: { year } })
      ]);
      setYears(yearsData.data);
      setData(litterData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchHotPoints = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/dashboard/get_hot_points`);
      sethotPoints(response.data);
    } catch (error) {
      console.error("Error fetching hot points:", error);
    }
  };

  const HeatmapLayer = () => {
    const map = useMap();
  
    useEffect(() => {
      if (hotPoints.length) {
        const heatLayer = L.heatLayer(hotPoints, { radius: 25, blur: 15, maxZoom: 17 }).addTo(map);
        return () => heatLayer.remove();
      }
    }, [map, hotPoints]);  // Depend on hotPoints to re-render heatmap when they change
  
    return null;
  };
  



  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard-content">

        <div className="chart-row">
          <ChartCard title="Litter Rate" data={data} years={years} selectedYear={selectedYear} onYearChange={setSelectedYear} />
          <MapContainer id="map" className="map-container" center={[33.6844, 73.0479]} zoom={12}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            <HeatmapLayer />
          </MapContainer>
        </div>


      </div>
    </div>

  );
  
  
};

const ChartCard = ({ title, data, years, selectedYear, onYearChange }) => (
  <div className="chart-card">
    <div className="chart-header">
      <h2>{title}</h2>
      <select className="data-selector" value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
        {years.map((year) => <option key={year} value={year}>{year}</option>)}
      </select>
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
);

export default Dashboard;



