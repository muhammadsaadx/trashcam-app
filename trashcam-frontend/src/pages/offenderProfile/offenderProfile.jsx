import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
import { styles, getFineStatusStyle } from "./offenderProfile.styles.js";
import Sidebar from "../../layout/sidebar/sidebar.jsx";

const OffenderProfile = () => {
  const [reportData, setReportData] = useState([]);
  const [offenderPersonalDetails, setOffenderPersonalDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idCardImage, setIdCardImage] = useState(null);
  const [idCardLoading, setIdCardLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [offencesLoading, setOffencesLoading] = useState(true);
  const { offenderid } = useParams();

  useEffect(() => {
    fetchOffenderPersonalDetails();
    fetchPastOffences();
  }, [offenderid]);

  useEffect(() => {
    if (offenderPersonalDetails && offenderPersonalDetails.cnic) {
      fetchIdCard(offenderPersonalDetails.cnic);
    } else {
      // If there's no CNIC, mark ID card loading as complete
      setIdCardLoading(false);
    }
  }, [offenderPersonalDetails]);

  // Update overall loading state whenever any of the individual loading states change
  useEffect(() => {
    setLoading(detailsLoading || offencesLoading || idCardLoading);
  }, [detailsLoading, offencesLoading, idCardLoading]);

  const fetchOffenderPersonalDetails = async () => {
    setDetailsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/offenders/get_offender_personal_details`,
        { params: { offender_id: offenderid } }
      );

      if (response.data && response.data.profile) {
        setOffenderPersonalDetails(response.data.profile);
      } else {
        setOffenderPersonalDetails({});
      }
    } catch (error) {
      setError("Failed to load personal details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const fetchPastOffences = async () => {
    setOffencesLoading(true);
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/offenders/get_offender_profile`,
        { params: { offender_id: offenderid } }
      );
      setReportData(response.data.reports || []);
    } catch (error) {
      setError(error.message || "Failed to load report data.");
    } finally {
      setOffencesLoading(false);
    }
  };

  const fetchIdCard = async (cnic) => {
    if (!cnic) return;
    
    setIdCardLoading(true);
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/offenders/get_offender_idcard`,
        { params: { cnic } }
      );
      
      if (response.data && response.data.image) {
        setIdCardImage(response.data.image);
      }
    } catch (error) {
      console.error("Failed to fetch ID card:", error);
    } finally {
      setIdCardLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.mainContent}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>Offender Profile</h1>
          <div style={styles.offenderid}>Offender ID: {offenderid}</div>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <CircularProgress size={60} style={styles.spinner} />
            <p style={styles.loadingText}>Loading offender data...</p>
          </div>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : (
          <div style={styles.col}>

            <div style={styles.row}>
              <Paper style={styles.personalSection}>
                <div style={styles.personalInfoContainer}>
                  <div style={styles.personalDetails}>
                    <p><strong>Name:</strong> {offenderPersonalDetails.name || "N/A"}</p>
                    <p><strong>CNIC:</strong> {offenderPersonalDetails.cnic || "N/A"}</p>
                    <p><strong>Address:</strong> {offenderPersonalDetails.address || "N/A"}</p>
                  </div>
                  
                  <div style={styles.idCardContainer}>
                    {idCardLoading ? (
                      <CircularProgress size={30} />
                    ) : idCardImage ? (
                      <img 
                        src={idCardImage} 
                        alt="ID Card" 
                        style={styles.idCardImage} 
                      />
                    ) : (
                      <div>
                        <h3>ID Card</h3>
                        <p>No ID card available</p>
                      </div>
                    )}
                  </div>
                </div>
              </Paper>
            </div>

            <TableContainer component={Paper} style={styles.offencesSection}>
              <h2>Past Offences</h2>
              <Table>
                <TableHead style={styles.tableHeader}>
                  <TableRow style={styles.tableRow}>
                    {["Sr.", "Location", "Date", "Time", "Fine Issued (Rs.)", "Fine Status"].map((header, index) => (
                      <TableCell key={index}><strong>{header}</strong></TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.length > 0 ? (
                    reportData.map((report, index) => (
                      <TableRow key={index}>
                        <TableCell style={styles.tableCell}>{index + 1}</TableCell>
                        <TableCell style={styles.tableCell}>{report.location}</TableCell>
                        <TableCell style={styles.tableCell}>
                          {new Date(report.timestamp).toLocaleDateString()}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {new Date(report.timestamp).toLocaleTimeString()}
                        </TableCell>
                        <TableCell style={styles.tableCell}>{report.fine_issued}</TableCell>
                        <TableCell style={styles.tableCell}>
                          <Button style={getFineStatusStyle(report.fine_status)}>
                            {report.fine_status}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} style={{ textAlign: "center" }}>No past offences found</TableCell>
                    </TableRow>
                  )}
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