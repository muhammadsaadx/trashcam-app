import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "../css/reports.css";
import axios from 'axios';
import config from '../config/config';

const Reports = ({ setActivePage, setSelectedReportID}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fineStatus, setFineStatus] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);

  // Static list of sectors in Islamabad
  const islamabadSectors = [
    "G-5", "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-12", "G-13", "G-14", 
    "G-15", "G-16", "G-17", "G-18", "G-19", "G-20", "G-21", "F-5", "F-6", "F-7", 
    "F-8", "F-9", "F-10", "F-11", "F-12", "F-13", "F-14", "F-15", "F-16", "F-17"
  ];

  useEffect(() => {
    fetchReportsData();
  }, [searchTerm, fineStatus, location]);

  const fetchReportsData = async () => {
    try {
      const queryParams = new URLSearchParams({ searchTerm, fineStatus, location }).toString();
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_list_of_reports?${queryParams}`);
      
      console.log(response.data);
      setData(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getStatusColor = status => ({ Paid: "#C0F2C9", Pending: "#CCCFEB", Missed: "#FAC8C9" }[status] || "#ffffff");

  const handleRowClick = row => {
    setSelectedReportID(row.reportid)
    setActivePage("reportDetails");
  };

  return (
    <div className="report">
      <header className="report-header">
        <h1>report</h1>
      </header>
      <div className="report-content"></div>
          <div className="filters">
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ marginBottom: 20, width: 200 }} />
            <FormControl variant="outlined" style={{ marginBottom: 20, minWidth: 200 }}>
              <InputLabel>Status</InputLabel>
              <Select value={fineStatus} onChange={e => setFineStatus(e.target.value.toString())} label="Status">
                <MenuItem value=""><em>All</em></MenuItem>
                {["Paid", "Pending", "Missed"].map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginBottom: 20, minWidth: 200 }}>
              <InputLabel>Location</InputLabel>
              <Select value={location} onChange={e => setLocation(e.target.value)} label="Location">
                <MenuItem value=""><em>All</em></MenuItem>
                {islamabadSectors.map((sector, index) => (
                  <MenuItem key={index} value={sector}>{sector}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  {["Name of Offender", "CNIC", "Location", "Fine", "Status"].map(header => <TableCell key={header} className="table-header">{header}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => (
                  <TableRow key={row.id} className="table-row" onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.cnic}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.fine}</TableCell>
                    <TableCell>
                      <Button style={{ backgroundColor: getStatusColor(row.status), color: "black", borderRadius: 20, padding: "8px 20px", fontWeight: 600 }}>
                        {row.status}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

    </div>


  );
};

export default Reports;
