import React, { useEffect, useState, useRef, useCallback } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import config from "../../config/config";
import useStyles from "./listReports.styles";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  Paid: { border: "#98C0A1", background: "#C0F2C9" },
  Pending: { border: "#A4A7C3", background: "#CCCFEB" },
  Missed: { border: "#D2A0A1", background: "#FAC8C9" },
  default: { border: "#C8C8C8", background: "#FFFFFF" },
};

const StatusButton = ({ status }) => {
  const { border, background } = STATUS_STYLES[status] || STATUS_STYLES.default;
  return (
    <Button
      style={{ backgroundColor: background, color: border, width: 100, borderRadius: 10, border: `2px solid ${border}`, padding: "8px 20px", fontWeight: 600, textTransform: "none" }}
    >
      {status}
    </Button>
  );
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
      const params = { startRow: start, endRow: end };
      const { data } = await axios.get(`${config.API_BASE_URL}/reports/get_list_of_reports`, { params });


      // console.log(data);



      return data;
    } catch (err) {
      setError("Failed to fetch reports. Please try again later.");
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetchReports(startRow, endRow);
      setReportData(data);
      setHasMore(data.length === (endRow - startRow));
      setIsLoading(false);
    })();
  }, []); 

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

  const renderTableContent = () => {
    if (isLoading) return <TableRow><TableCell colSpan={5} align="center"><CircularProgress /></TableCell></TableRow>;
    if (error) return <TableRow><TableCell colSpan={5} align="center" style={{ color: "red" }}>{error}</TableCell></TableRow>;
    if (!reportData.length) return <TableRow><TableCell colSpan={5} align="center">No fines to display</TableCell></TableRow>;

    return reportData.map(({ reportid, name, cnic, location, fine, status }, index) => (
    
      <TableRow 
        key={`${reportid}-${index}`} 
        className={styles.tableRow} 
        onClick={() => navigate(`/reportDetails/${reportid}`)} 
        hover={true}
        ref={index === reportData.length - 1 ? lastReportElementRef : null}
      >
        <TableCell>{name}</TableCell>
        <TableCell>{cnic}</TableCell>
        <TableCell>{location}</TableCell>
        <TableCell>{fine}</TableCell>
        <TableCell><StatusButton status={status} /></TableCell>
      </TableRow>
    ));
  };

  return (
    <div className={styles.report}>
      <header className={styles.reportHeader}><h1>List of Fines</h1></header>
      <div className={styles.reportContent}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "CNIC", "Location", "Fine", "Status"].map((header) => (
                  <TableCell key={header} className={styles.tableHeader}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {renderTableContent()}
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