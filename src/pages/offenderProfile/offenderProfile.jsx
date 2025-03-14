import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./offenderProfile.styles.js";
import Sidebar from "../../layout/sidebar/Sidebar.jsx";

const OffenderProfile = () => {
  const [reportData, setReportData] = useState(null);
  const { reportid } = useParams();

  useEffect(() => {
    fetchReportData();
  }, [reportid]);

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_single_report`, {
        params: { report_id: reportid },
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Case Report Details</h1>
          <div style={styles.reportId}>Report ID: {reportid}</div>
        </div>

        {reportData ? (
          <div style={styles.reportDetails}>
            <p><strong>Location:</strong> {reportData.location_of_offence || "N/A"}</p>
            <p><strong>Date:</strong> {reportData.date_of_offence || "N/A"}</p>
            <p><strong>Time:</strong> {reportData.time_of_offence || "N/A"}</p>
            <p><strong>Detail:</strong></p>
            <p style={styles.detailsText}>{reportData.info_details || "N/A"}</p>
          </div>
        ) : (


                      <div style={styles.reportDetails}>
                        <p><strong>Location:</strong> </p>
                        <p><strong>Date:</strong> </p>
                        <p><strong>Time:</strong> </p>
                        <p><strong>Detail:</strong></p>
                        <p style={styles.detailsText}></p>
                      </div>





          // <div style={styles.loadingContainer}>
          //   <CircularProgress size={60} style={styles.spinner} />
          //   <p style={styles.loadingText}>Loading report details...</p>
          // </div>
        )}
      </div>
    </div>
  );
};

export default OffenderProfile;