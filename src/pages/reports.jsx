import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import "../css/reports.css";
import axios from 'axios';
import config from '../config/config';

const Reports = ({ setActivePage , setSelectedCNIC}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_list_of_reports`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(row => 
    (row.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     row.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     row.cnic.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter ? row.status === statusFilter : true) &&
    (locationFilter ? row.location === locationFilter : true)
  );

  const getStatusColor = status => ({ Paid: "#C0F2C9", Pending: "#CCCFEB", Missed: "#FAC8C9" }[status] || "#ffffff");

  const handleRowClick = row => {
    
    setSelectedCNIC(row.cnic);
    setActivePage("reportDetails");
  };

  return (
    <div className="Reports-list">
      <h2>List of Reports</h2>
      <div className="filters">
        <TextField label="Search" variant="outlined" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ marginBottom: 20, width: 200 }} />
        <FormControl variant="outlined" style={{ marginBottom: 20, minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} label="Status">
            <MenuItem value=""><em>All</em></MenuItem>
            {["Paid", "Pending", "Missed"].map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginBottom: 20, minWidth: 200 }}>
          <InputLabel>Location</InputLabel>
          <Select value={locationFilter} onChange={e => setLocationFilter(e.target.value)} label="Location">
            <MenuItem value=""><em>All</em></MenuItem>
            {[...new Set(data.map(row => row.location))].map(location => <MenuItem key={location} value={location}>{location}</MenuItem>)}
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
            {filteredData.map(row => (
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
