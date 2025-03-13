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
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_single_report`, { params: { report_id: reportid } });
      console.log(response.data);
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };




  // use deep seek 
  // carosel 
  // map with pin

  return (
    <div style={styles.report}>
      <header style={styles.reportHeader}>
        <h1>Report Details</h1>
      </header>
      <div style={styles.reportContent}>
        {reportData ? (
          <>
            <div style={styles.personalDetailsChartCard}>
              <div style={styles.personalDetails}>
                <h2>Offence Details</h2>
                <p><strong>Report ID:</strong> {reportid}</p>
                <p><strong>Location of Offence:</strong> {reportData.location_of_offence}</p>
                <p><strong>Date of Offence:</strong> {reportData.date_of_offence}</p>
                <p><strong>Time of Offence:</strong> {reportData.time_of_offence}</p>
                <p><strong>Info Details:</strong> {reportData.info_details}</p>
              </div>
            </div>
            
            <div style={styles.personalDetailsChartCard}>
              <div style={styles.personalDetails}>
                <h2>Offenders Involved</h2>
                {reportData.offenders.length > 0 ? (
                  <div style={styles.tableContainer}>
                    <table style={styles.offendersTable}>
                      <thead>
                        <tr>
                          <th style={styles.tableHeader}>Name</th>
                          <th style={styles.tableHeader}>CNIC</th>
                          <th style={styles.tableHeader}>Address</th>
                          <th style={styles.tableHeader}>Total Offences</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.offenders.map((offender, index) => (
                          <tr key={index} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                            <td style={styles.tableCell}>{offender.name}</td>
                            <td style={styles.tableCell}>{offender.cnic}</td>
                            <td style={styles.tableCell}>{offender.address}</td>
                            <td style={styles.tableCell}>{offender.total_offences}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No offenders listed.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading report data...</p>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;