import React from 'react';
import '../css/fines.css';

const finesData = [
  { name: 'Ahmed Khan', date: 'Monday, 23 April', time: '3:30 PM - 6:00 PM', location: 'Islamabad', fine: 'Rs 3400', report: 'Ahmed Khan', status: 'Paid' },
  { name: 'Ahmed Khan', date: 'Monday, 23 April', time: '3:30 PM - 6:00 PM', location: 'Islamabad', fine: 'Rs 3400', report: 'Ahmed Khan', status: 'Pending' },
  { name: 'Ahmed Khan', date: 'Monday, 23 April', time: '3:30 PM - 6:00 PM', location: 'Islamabad', fine: 'Rs 3400', report: 'Ahmed Khan', status: 'Missed' },
  // Add more data as needed
];

function Fines() {
  return (
    <div className="fines-list">
      <h2>List of Fines</h2>
      <table className="fines-table">
        <thead>
          <tr>
            <th>Name of Offender</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Fine</th>
            <th>Report</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {finesData.map((fine, index) => (
            <tr key={index}>
              <td>{fine.name}</td>
              <td>{fine.date}</td>
              <td>{fine.time}</td>
              <td>{fine.location}</td>
              <td>{fine.fine}</td>
              <td>
                <button
                  className="report-link"
                  onClick={() => alert('Report clicked')}
                >
                  {fine.report}
                </button>
              </td>
              <td>
                <span className={`status-badge ${fine.status.toLowerCase()}`}>
                  {fine.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="prev">«</button>
        <span className="page-number">1</span>
        <span className="page-number">2</span>
        <span className="page-number">3</span>
        <button className="next">»</button>
      </div>
    </div>
  );
}

export default Fines;
