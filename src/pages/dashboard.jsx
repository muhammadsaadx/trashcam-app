// frontend/src/pages/Dashboard.jsx
import React from 'react';
import '../css/dashboard.css'; // Adjust if needed

function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Litter Rate</p>
      </header>

      <section className="dashboard-content">
        <div className="stats-card">
          <h2>820</h2>
          <p>Visitors Over Time</p>
          <small>+12.5% Since last week</small>
        </div>
        <div className="stats-card">
          <h2>$18,230.00</h2>
          <p>Fines Issued</p>
          <small>+33.1% Since last month</small>
        </div>

        <div className="stats-graph">
          <h3>Recent Reports</h3>
          <ul className="report-list">
            <li>Ahmed Khan - Rs 4300 - Islamabad</li>
            <li>Product B - $29 - Lahore</li>
            <li>Amazing Product - $1,230 - 198 Sold</li>
            <li>Perfect Item - $199 - 87 Sold</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
