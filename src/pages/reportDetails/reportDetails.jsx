// ReportDetails.jsx
import React, { useEffect, useState } from "react";
import styles from './reportDetails.styles.js';
import axios from 'axios';
import config from '../../config/config';
import { useParams } from "react-router-dom";

const ReportDetails = () => {
  const [reportData, setReportData] = useState(null);
  
  const { reportid } = useParams();

  useEffect(() => {
    fetchReportData();
  }, [reportid]);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_report`, { params: { report_id: reportid } });
      setReportData(response.data[0]);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };



  // DISPLAY MAP HERE LIKE THE PIN THNGY




  return (
    <div style={styles.report}>
      <header style={styles.reportHeader}>
        <h1>Report</h1>
      </header>
      <div style={styles.reportContent}>
        <div style={styles.personalDetailsChartCard}>
          <div style={styles.personalDetails}>
            <h2>Personal Details</h2>
            <p><strong>Report ID:</strong> {reportid}</p>
            <p><strong>Offender Name:</strong> {reportData?.offender_name}</p>
            <p><strong>CNIC:</strong> {reportData?.cnic}</p>
            <p><strong>Address:</strong> {reportData?.address}</p>
          </div>
        </div>

        <div style={styles.personalDetailsChartCard}>
          <div style={styles.personalDetails}>
            <p><strong>Location of Offence:</strong> {reportData?.location_of_offence}</p>
            <p><strong>Date of Offence:</strong> {reportData?.date_of_offence}</p>
            <p><strong>Time of Offence:</strong> {reportData?.time_of_offence}</p>
            <p><strong>Info Details:</strong> {reportData?.info_details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;