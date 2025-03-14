import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import { useParams } from "react-router-dom";
import { 
  CircularProgress, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Button 
} from "@mui/material";
import styles from "./offenderProfile.styles.js";
import Sidebar from "../../layout/sidebar/Sidebar.jsx";

const STATUS_STYLES = {
  Paid: { border: "#98C0A1", background: "#C0F2C9" },
  Pending: { border: "#A4A7C3", background: "#CCCFEB" },
  Missed: { border: "#D2A0A1", background: "#FAC8C9" },
  default: { border: "#C8C8C8", background: "#FFFFFF" },
};

const OffenderProfile = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { offenderid } = useParams();

  useEffect(() => {
    fetchReportData();
  }, [offenderid]);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/offenders/get_offender_profile`,
        { params: { offender_id: offenderid } }
      );
      setReportData(response.data.reports || []);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Case Report Details</h1>
          <div style={styles.offenderid}>Report ID: {offenderid}</div>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <CircularProgress size={60} style={styles.spinner} />
            <p style={styles.loadingText}>Loading report details...</p>
          </div>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <div style={styles.row}>
            <TableContainer component={Paper} style={styles.offencesSection}>
              <Table>
                <TableHead style={styles.tableHeader}>
                  <TableRow style={styles.tableRow}>
                    {["Report ID", "Location", "Date", "Time", "Fine Status", "Fine Issued (Rs.)"].map((header, index) => (
                      <TableCell key={index}><strong>{header}</strong></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.map((report, index) => (
                    <TableRow key={index}>
                      {["report_id", "location", "timestamp", "timestamp", "fine_status", "fine_issued"].map((key, i) => (
                        <TableCell key={i} style={styles.tableCell}>
                          {key.includes("timestamp") ? (
                            new Date(report[key])[i === 2 ? "toLocaleDateString" : "toLocaleTimeString"]()
                          ) : key === "fine_status" ? (
                            <Button
                              style={{ 
                                backgroundColor: STATUS_STYLES[report.fine_status]?.background || STATUS_STYLES.default.background, 
                                color: "white", 
                                borderRadius: 7, 
                                border: `1px solid ${STATUS_STYLES[report.fine_status]?.border || STATUS_STYLES.default.border}`, 
                                padding: "4px 16px", 
                                fontWeight: 500, 
                                textTransform: "none",
                                fontSize: "0.75rem",
                                minWidth: 80
                              }}
                            >
                              {report[key]}
                            </Button>
                          ) : (
                            report[key]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffenderProfile;
