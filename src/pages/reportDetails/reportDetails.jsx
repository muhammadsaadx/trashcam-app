import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styles from "./reportDetails.styles.js";
import axios from "axios";
import config from "../../config/config";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@mui/material";
import Sidebar from "../../layout/sidebar/Sidebar.jsx";

import "leaflet/dist/leaflet.css";

// Custom marker icon for Leaflet
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Location pin icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const STATUS_STYLES = {
  Paid: { border: "#98C0A1", background: "#C0F2C9" },
  Pending: { border: "#A4A7C3", background: "#CCCFEB" },
  Missed: { border: "#D2A0A1", background: "#FAC8C9" },
  default: { border: "#C8C8C8", background: "#FFFFFF" },
};

const ReportDetails = () => {
  const [reportData, setReportData] = useState(null);
  const { reportid } = useParams();
  const navigate = useNavigate();

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

  const handleOffenderClick = (offender) => {
    navigate(`/offenderProfile/${offender.offender_id}`);
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
          <>
            <div style={styles.row}>
              <div style={styles.reportDetails}>
                <p><strong>Location:</strong> {reportData.location_of_offence || "N/A"}</p>
                <p><strong>Date:</strong> {reportData.date_of_offence || "N/A"}</p>
                <p><strong>Time:</strong> {reportData.time_of_offence || "N/A"}</p>
                <p><strong>Detail:</strong></p>
                <p style={styles.detailsText}>{reportData.info_details || "N/A"}</p>
              </div>

              <div style={styles.col}>
                <div style={styles.offendersSection}>
                  <h3>Offenders</h3>
                  {reportData.offenders && reportData.offenders.length > 0 ? (
                    <table style={styles.table}>
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
                          <tr key={index} style={styles.tableRow}>
                            <td style={styles.tableCell}>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleOffenderClick(offender);
                                }}
                                style={styles.clickableText}
                              >
                                {offender.name}
                              </a>
                            </td>
                            <td style={styles.tableCell}>{offender.cnic}</td>
                            <td style={styles.tableCell}>{offender.address}</td>
                            <td style={styles.tableCell}>{offender.total_offences}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No offenders found.</p>
                  )}
                </div>

                <div style={styles.fineStatusSection}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0 }}><strong>Fine Issued:</strong> Rs {reportData.fine_issued}</p>
                    <Button
                      style={{ 
                        backgroundColor: STATUS_STYLES[reportData.fine_status]?.background || STATUS_STYLES.default.background, 
                        color: STATUS_STYLES[reportData.fine_status]?.border || STATUS_STYLES.default.border, 
                        borderRadius: 20, 
                        border: `1px solid ${STATUS_STYLES[reportData.fine_status]?.border || STATUS_STYLES.default.border}`, 
                        padding: "4px 16px", 
                        fontWeight: 500, 
                        textTransform: "none",
                        fontSize: "0.75rem",
                        minWidth: 80
                      }}
                    >
                      {reportData.fine_status}
                    </Button>
                  </div>
                </div>

                {/* Map Section */}
                <div style={styles.mapSection}>
                  <MapContainer
                    center={[reportData.latitude || 33.6844, reportData.longitude || 73.0479]}
                    zoom={13}
                    style={{ height: "400px", width: "100%", borderRadius: "8px" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {reportData.latitude && reportData.longitude && (
                      <Marker position={[reportData.latitude, reportData.longitude]} icon={customIcon}>
                        <Popup>
                          <strong>Incident Location</strong>
                          <br />
                          {reportData.location_of_offence || "Unknown Location"}
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={styles.loadingContainer}>
            <CircularProgress size={60} style={styles.spinner} />
            <p style={styles.loadingText}>Loading report details...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;