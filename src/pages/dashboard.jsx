// frontend/src/pages/Dashboard.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../css/dashboard.css';

const data = [
  { name: 'Jan', incidents: 1200 },
  { name: 'Feb', incidents: 1500 },
  { name: 'Mar', incidents: 1300 },
  { name: 'Apr', incidents: 1700 },
  { name: 'May', incidents: 1600 },
  { name: 'Jun', incidents: 1800 },
  { name: 'Jul', incidents: 2200 },
  { name: 'Aug', incidents: 2100 },
  { name: 'Sep', incidents: 1900 },
  { name: 'Oct', incidents: 2300 },
  { name: 'Nov', incidents: 2500 },
  { name: 'Dec', incidents: 2700 },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>

      <div className="dashboard-content">
        <div className="chart-card">
          <div className="chart-header">
            <h2>Litter Rate (Recharts)</h2>
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
      </div>
    </div>
  );
}

export default Dashboard;






































// <div className="statistics-cards">
// <div className="statistics-card">
//   <h3>Fines Issued</h3>
//   <p>$18,230.00</p>
//   <small>33.1% Since last month</small>
// </div>
// <div className="statistics-card">
//   <h3>Recent Offenders</h3>
//   <table className="offenders-table">
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>Fine Issued</th>
//         <th>Location</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>Ahmed Khan</td>
//         <td>Rs 4300</td>
//         <td>Islamabad</td>
//       </tr>
//       <tr>
//         <td>John Doe</td>
//         <td>$29</td>
//         <td>Lahore</td>
//       </tr>
//       <tr>
//         <td>Jane Smith</td>
//         <td>$1,230</td>
//         <td>Karachi</td>
//       </tr>
//       <tr>
//         <td>Ali Raza</td>
//         <td>$199</td>
//         <td>Faisalabad</td>
//       </tr>
//     </tbody>
//   </table>
// </div>
// </div>

// <div className="additional-stats">
// <div className="stats-card">
//   <h3>Online Store Overview</h3>
//   <ul>
//     <li>Conversion Rate: 12%</li>
//     <li>Sales Rate: 0.8%</li>
//     <li>Registration Rate: 1%</li>
//   </ul>
// </div>
// </div>


