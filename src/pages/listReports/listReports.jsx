import React, { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, TextField, MenuItem, Select, InputLabel, FormControl 
} from "@mui/material";
import axios from 'axios';
import config from '../../config/config';
import useStyles from './listReports.styles'; // Import styles
import { useNavigate } from "react-router-dom";


const Reports = () => {
  const classes = useStyles(); // Use styles
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [fineStatus, setFineStatus] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);


  const islamabadSectors = ["G-5", "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-12", "G-13", "G-14", "G-15", "G-16", "G-17", "G-18", "G-19", "G-20", "G-21", "F-5", "F-6", "F-7", "F-8", "F-9", "F-10", "F-11", "F-12", "F-13", "F-14", "F-15", "F-16", "F-17"];

  useEffect(() => {
    fetchReportsData();
  }, [searchTerm, fineStatus, location]);

  const fetchReportsData = async () => {
    try {
      const queryParams = new URLSearchParams({ searchTerm, fineStatus, location }).toString();
      const response = await axios.get(`${config.API_BASE_URL}/reports/get_list_of_reports?${queryParams}`);
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getStatusBorderColor = (status) => ({
    Paid: "rgba(152, 192, 161, 1)",
    Pending: "rgba(164, 167, 195, 1)",
    Missed: "rgba(210, 160, 161, 1)"
  }[status] || "rgba(200, 200, 200, 1)");

  const getStatusColor = (status) => ({
    Paid: "rgba(192, 242, 201, 0.5)",
    Pending: "rgba(204, 207, 235, 0.5)",
    Missed: "rgba(250, 200, 201, 0.5)"
  }[status] || "rgba(255, 255, 255, 1)");



  const handleRowClick = (row) => {

    console.log(row.reportid);

    navigate(`/reportDetails/${row.reportid}`);


  };






  return (
    <div className={classes.report}>
      <header className={classes.reportHeader}>
        <h1>List of Fines</h1>
      </header>

      <div className={classes.reportContent}>
        <div className={classes.filters}>
          <TextField 
            label="Search" 
            variant="outlined" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className={classes.textField}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Status</InputLabel>
            <Select value={fineStatus} onChange={e => setFineStatus(e.target.value)} label="Status">
              <MenuItem value=""><em>All</em></MenuItem>
              {["Paid", "Pending", "Missed"].map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Location</InputLabel>
            <Select value={location} onChange={e => setLocation(e.target.value)} label="Location">
              <MenuItem value=""><em>All</em></MenuItem>
              {islamabadSectors.map((sector, index) => (
                <MenuItem key={index} value={sector}>{sector}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={classes.reportChartCard}>
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>Name</TableCell>
                  <TableCell className={classes.tableHeader}>CNIC</TableCell>
                  <TableCell className={classes.tableHeader}>Location</TableCell>
                  <TableCell className={classes.tableHeader}>Fine</TableCell>
                  <TableCell className={classes.tableHeader}>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map(row => (
                  <TableRow 
                    key={row.id} 
                    className={classes.tableRow} 
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.cnic}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.fine}</TableCell>
                    <TableCell>
                      <Button 
                        style={{
                          backgroundColor: getStatusColor(row.status),
                          color: getStatusBorderColor(row.status),
                          width: 100,
                          borderRadius: 10,
                          border: `2px solid ${getStatusBorderColor(row.status)}`,
                          padding: "8px 20px",
                          fontWeight: 600 
                        }}
                      >
                        {row.status}
                      </Button>
                    </TableCell>
                    <div className={classes.rowSeparator} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
