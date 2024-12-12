import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
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
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    fetchHotPoints();
    fetchStatusData();
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
    }, [map, hotPoints]); // Depend on hotPoints to re-render heatmap when they change
  
    return null;
  };

  const fetchStatusData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/dashboard/get_status_data`);
      const [totalReports, paidReports, pendingReports, missedReports] = response.data[0];
      const formattedData = [
        { name: 'Total', value: totalReports },
        { name: 'Paid', value: paidReports },
        { name: 'Pending', value: pendingReports },
        { name: 'Missed', value: missedReports },
      ];
      setStatusData(formattedData);
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
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


        <div className='chart'>
          <StatusBarChart data={statusData} />
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


const StatusBarChart = ({ data }) => (
  <div className="chart-card" style={styles.chartCard}>
    <div className="chart-header" style={styles.chartHeader}>
      <h2 style={styles.headerText}>Report Status</h2>
    </div>
    <div className="chart-wrapper" style={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06715A" stopOpacity={1} />
              <stop offset="100%" stopColor="#84d8b9" stopOpacity={0.9} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#555' }} angle={-30} textAnchor="end" />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} />
                    <Tooltip
            content={({ active, payload }) =>
              active && payload && payload.length > 0 ? (
                <div style={styles.customTooltip}>
                  <p>{`${payload[0].payload.name}: ${payload[0].value}`}</p>
                </div>
              ) : null
            }
          />

          <Legend />
          <Bar 
            dataKey="value" 
            fill="url(#colorGradient)" 
            radius={[10, 10, 0, 0]} 
            isAnimationActive={true} 
            animationDuration={1500} 
            label={{ position: 'top', fill: '#000', fontSize: 12 }} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const styles = {
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px 0',
  },
  chartHeader: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  headerText: {
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
  },
  chartWrapper: {
    height: '300px',
  },
  customTooltip: {
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
};

export default Dashboard;