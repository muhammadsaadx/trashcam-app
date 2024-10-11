// frontend/src/pages/Dashboard.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import '../css/dashboard.css';

const data = [
  { name: 'Jun', incidents: 1800, week1: 700, week2: 1100 },
  { name: 'Jul', incidents: 2200, week1: 900, week2: 1300 },
  { name: 'Aug', incidents: 2100, week1: 800, week2: 1300 },
  { name: 'Sep', incidents: 1900, week1: 1200, week2: 1300 },
  { name: 'Oct', incidents: 2300, week1: 1000, week2: 600 },
  { name: 'Nov', incidents: 2500, week1: 1100, week2: 1400 },
  { name: 'Dec', incidents: 2700, week1: 900, week2: 1800 },
];



const offenders = [
  { name: 'Ahmed Khan', fine: 'Rs 4300', location: 'Islamabad' },
  { name: 'John Doe', fine: '$29', location: 'Lahore' },
  { name: 'Jane Smith', fine: '$1,230', location: 'Karachi' },
  { name: 'Ali Raza', fine: '$199', location: 'Faisalabad' },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-content">
        <div className="chart-row">
          <div className="chart-card">
            <div className="chart-header">
              <h2>Litter Rate </h2>
              <button className="view-report" onClick={() => alert('Report clicked')}>
                View Report
              </button>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="incidents" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h2>Weekly Comparison </h2>
            </div>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="week1" fill="#06715A" name="Week 1" />
                  <Bar dataKey="week2" fill="#CED4DA" name="Week 2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="statistics-cards">
          <div className="statistics-card">
            <h3>Recent Offenders</h3>
            <table className="offenders-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Fine Issued</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {offenders.map((offender, index) => (
                  <tr key={index}>
                    <td>{offender.name}</td>
                    <td>{offender.fine}</td>
                    <td>{offender.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
