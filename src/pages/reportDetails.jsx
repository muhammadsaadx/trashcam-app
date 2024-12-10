import React from 'react';
import '../css/reportDetails.css';

const ReportDetails = ({ selectedReportID }) => {

  
  return (
    <div className="Report">
      <header className="Report-header">
        <h1>Report</h1>
      </header>
      <div className="Report-content">
        <p>Report ID: {selectedReportID}</p>
      </div>
    </div>
  );
};

export default ReportDetails;
