import React, { useEffect, useState, useRef, useCallback } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import config from "../../config/config";
import useStyles from "./listReports.styles";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sidebar/sidebar";

const STATUS_STYLES = {
  Paid: { border: "#98C0A1", background: "#C0F2C9" },
  Pending: { border: "#A4A7C3", background: "#CCCFEB" },
  Missed: { border: "#D2A0A1", background: "#FAC8C9" },
  default: { border: "#C8C8C8", background: "#FFFFFF" },
};

const Reports = () => {
  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const styles = useStyles();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedFineStatus, setSelectedFineStatus] = useState("");
  const [locations, setLocations] = useState([]);
  
  const observer = useRef();
  const lastReportElementRef = useCallback(node => {
    if (isLoading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreReports();
      }
    }, { threshold: 0.5 });
    
    if (node) observer.current.observe(node);
  }, [isLoading, loadingMore, hasMore]);

  const fetchReports = async (start, end) => {
    try {
      const params = { 
        startRow: start, 
        endRow: end,
        searchTerm: searchTerm,
        fineStatus: selectedFineStatus,
        location: selectedLocation,
      };
      
      const { data } = await axios.get(`${config.API_BASE_URL}/reports/get_list_of_reports`, { params });
      return data;
    } catch (err) {
      setError("Failed to fetch reports. Please try again later.");
      return [];
    }
  };

  // Extract locations from report data
  useEffect(() => {
    const uniqueLocations = [...new Set(reportData.map(report => report.location))]
      .sort((a, b) => a.localeCompare(b));
    setLocations(uniqueLocations);
  }, [reportData]);

  useEffect(() => {
    setStartRow(0);
    setEndRow(10);
    setHasMore(true);
    
    (async () => {
      setIsLoading(true);
      const data = await fetchReports(0, 10);
      setReportData(data);
      setHasMore(data.length === 10);
      setIsLoading(false);
    })();
  }, [searchTerm, selectedLocation, selectedFineStatus]); 

  const loadMoreReports = async () => {
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    const newStartRow = endRow;
    const newEndRow = endRow + 10;
    
    const newData = await fetchReports(newStartRow, newEndRow);
        
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setReportData(prevData => [...prevData, ...newData]);
      setStartRow(newStartRow);
      setEndRow(newEndRow);
      setHasMore(newData.length === 10);
    }
    
    setLoadingMore(false);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleLocationChange = (e) => setSelectedLocation(e.target.value);
  const handleStatusChange = (e) => setSelectedFineStatus(e.target.value);

  const applyFilters = () => {
    setStartRow(0);
    setEndRow(10);
    setIsLoading(true);
    
    (async () => {
      const data = await fetchReports(0, 10);
      setReportData(data);
      setHasMore(data.length === 10);
      setIsLoading(false);
    })();
  };

  const formatTime = (time) => time;
  const formatDate = (date) => date;

  return (
    <div className={styles.report}>
      <Sidebar />

      <h1>List of Fines</h1>

      <div className={styles.filtersContainer}>
        <div className={styles.filterSection}>
          <input 
            type="text" 
            placeholder="Search by name or CNIC..." 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={handleSearch}
          />

          <FormControl variant="outlined" size="small" style={{ minWidth: 250 }}>
            <InputLabel>Location</InputLabel>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              label="Location"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="" className={styles.selectItem}>
                <em>All Locations</em>
              </MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" style={{ minWidth: 250 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedFineStatus}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="" className={styles.selectItem}>
                <em>All Statuses</em>
              </MenuItem>
              {['Paid', 'Pending', 'Missed'].map((status) => (
                <MenuItem 
                  key={status} 
                  value={status}
                  className={styles.selectItem}
                >
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          
        </div>
      </div>

      <div className={styles.reportContent}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {["Name of Offender", "Location", "Fine", "Report", "Status"].map((col) => (
                  <TableCell key={col} className={styles.tableHeader}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>
              ) : error ? (
                <TableRow><TableCell colSpan={5} align="center" style={{ color: "red" }}>{error}</TableCell></TableRow>
              ) : !reportData.length ? (
                <TableRow><TableCell colSpan={5} align="center">No fines to display</TableCell></TableRow>
              ) : (
                reportData.map(({ reportid, name, date, time, location, fine, status, cnic }, index) => (
                  <TableRow 
                    key={`${reportid}-${index}`} 
                    className={styles.tableRow} 
                    onClick={() => navigate(`/reportDetails/${reportid}`)} 
                    hover={true}
                    ref={index === reportData.length - 1 ? lastReportElementRef : null}
                  >
                    <TableCell className={styles.nameCell}>
                      <div className={styles.nameWrapper}>
                        <div className={styles.officerName}>{name}</div>
                        <div className={styles.timeInfo}>{formatDate(date)} · {formatTime(time)}</div>
                      </div>
                    </TableCell>
                    <TableCell className={styles.locationCell}>{location}</TableCell>
                    <TableCell className={styles.fineCell}>{fine}</TableCell>
                    <TableCell className={styles.reportCell}>
                      <Button
                        className={styles.reportButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/reportDetails/${reportid}`);
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell className={styles.statusCell}>
                      <Button
                        style={{ 
                          backgroundColor: STATUS_STYLES[status]?.background || STATUS_STYLES.default.background, 
                          color: STATUS_STYLES[status]?.border || STATUS_STYLES.default.border, 
                          borderRadius: 20, 
                          border: `1px solid ${STATUS_STYLES[status]?.border || STATUS_STYLES.default.border}`, 
                          padding: "4px 16px", 
                          fontWeight: 500, 
                          textTransform: "none",
                          fontSize: "0.75rem",
                          minWidth: 80
                        }}
                      >
                        {status}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {loadingMore && (
                <TableRow>
                  <TableCell colSpan={5} align="center" padding="normal">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Reports;