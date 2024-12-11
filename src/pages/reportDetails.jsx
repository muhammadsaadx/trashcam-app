import React, { useEffect, useState } from "react";
import '../css/reportDetails.css';
import axios from 'axios';
import config from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReportDetails = ({ selectedReportID }) => {
  const [reportData, setReportData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [idCardImage, setIdCardImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedReportID) {
      fetchReportData();
    }
  }, [selectedReportID]);

  useEffect(() => {
    if (reportData && reportData.cnic) {
      fetchIDCardImage(reportData.cnic);
      fetchHistoryData(reportData.cnic);
    }
  }, [reportData]);

  const fetchHistoryData = async (cnic) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_history_data`, { params: { cnic } });
      setHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_report`, { params: { report_id: selectedReportID } });
      setReportData(response.data[0]);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  const fetchIDCardImage = async (cnic) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_id_card_image`, {
        params: { cnic },
        responseType: 'blob',
      });

      if (response.data) {
        const imageURL = URL.createObjectURL(response.data);
        setIdCardImage(imageURL);
      } else {
        console.error("ID card image not found:", response.data.error);
        setImageError(true);
      }
    } catch (error) {
      console.error("Error fetching ID card image:", error);
      setImageError(true);
    }
  };

  useEffect(() => {
    if (reportData && idCardImage) {
      setLoading(false);
    }
  }, [reportData, idCardImage]);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="Report">
      <header className="Report-header">
        <h1>Report</h1>
      </header>
      <div className="Report-content">
        <div className="personal-details-chart-card">
          <div className="personal-details">
            <h2>Personal Details</h2>
            <p><strong>Offender Name:</strong> {reportData.offender_name}</p>
            <p><strong>CNIC:</strong> {reportData.cnic}</p>
            <p><strong>Address:</strong> {reportData.address}</p>
          </div>

          <div className="id-card-image">
            {idCardImage ? (
              <img src={idCardImage} alt="ID Card" className="id-card-img" />
            ) : imageError ? (
              <p>Error loading ID card image.</p>
            ) : (
              <p>Loading ID card image...</p>
            )}
          </div>
        </div>

        <div className="personal-details-chart-card">
          <h2>History</h2>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Date</TableCell>
                  <TableCell className="table-header" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Fine Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {historyData.length > 0 ? (
                  historyData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="table-cell">{row.offense_date}</TableCell>
                      <TableCell className="table-cell">{row.fine_status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>No history available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>


        <div className="personal-details-chart-card">

          <div className="personal-details">
            <p><strong>Location of Offence:</strong> {reportData.location_of_offence}</p>
            <p><strong>Date of Offence:</strong> {reportData.date_of_offence}</p>
            <p><strong>Time of Offence:</strong> {reportData.time_of_offence}</p>
            <p><strong>Info Details:</strong> {reportData.info_details}</p>
          </div>

        </div>



      </div>
    </div>
  );
};

export default ReportDetails;
