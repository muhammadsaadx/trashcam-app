import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  report: {
    position: "fixed",
    height: "100vh",
    width: "100vh",
    top: '0%',
    left: '18%',
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  filtersContainer: {
    width: "100%",
    marginBottom: "20px",
  },
  horizontalFilters: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: "15px",
  },
  searchInput: {
    width: "20%",
    padding: "12px 20px",
    border: "1px solid #E0E0E0",
    borderRadius: "10px",
    fontSize: "0.9rem",
    outline: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    transition: "all 0.2s ease",
    "&::placeholder": {
      color: "#AAAAAA",
      fontStyle: "italic",
    }
  },
  filterButton: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    border: "1px solid #E0E0E0",
    padding: "5px 18px",
    backgroundColor: "white",
    cursor: "pointer",
    flex: "1",
    maxWidth: "150px",
    fontSize: "0.9rem",
    fontWeight: 500,
    position: "relative",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    "&::after": {
      content: '"▼"',
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "0.7rem",
      color: "#777777",
    }
  },
  filterSubtext: {
    fontSize: "0.7rem",
    color: "#999999",
    marginTop: "2px",
  },
  analysisButton: {
    backgroundColor: "#006E51",
    color: "white",
    borderRadius: "10px !important",
    padding: "10px 24px",
    textTransform: "none",
    fontWeight: 500,
    boxShadow: "0 4px 10px rgba(0,110,81,0.2)",
    "&.MuiButton-root": {
      backgroundColor: "#006E51",
      color: "white",
    }
  },
  reportHeader: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "1rem",
    color: "#333333",
    marginBottom: "15px",
    textAlign: "left",
    width: "100%",
    "& h2": {
      fontSize: "1.2rem",
      fontWeight: 600,
      margin: 0,
    }
  },
  reportContent: {
    display: "flex",
    flexDirection: "column",
    width: "150%",
    height: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.06)",
    overflow: "hidden",
  },
  tableContainer: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    border: "none",
    boxShadow: "none",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f5f5f5",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#d1d1d1",
      borderRadius: "4px",
    },
  },
  tableHeader: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#555555",
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderBottom: "1px solid #EEEEEE",
    padding: "14px 20px",
    "&.MuiTableCell-head": {
      fontWeight: 600,
      backgroundColor: "#fff",
    }
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F2F8F6",
    },
    "& .MuiTableCell-root": {
      padding: "16px 20px",
      fontSize: "0.85rem",
      borderBottom: "1px solid #EEEEEE",
    },
  },
  nameCell: {
    minWidth: "220px",
  },
  nameWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  officerName: {
    fontWeight: 600,
    marginBottom: "4px",
    color: "#333333",
  },
  timeInfo: {
    fontSize: "0.75rem",
    color: "#777777",
  },
  locationCell: {
    "& span": {
      color: "#2E7D32",
      fontWeight: 500,
      background: "rgba(46, 125, 50, 0.07)",
      borderRadius: "12px",
      padding: "4px 10px",
      display: "inline-block",
    }
  },
  fineCell: {
    fontWeight: 600,
    color: "#333333",
  },
  reportCell: {
    "& .MuiButton-root": {
      textTransform: "none",
      padding: "6px 12px",
      minWidth: "auto",
      fontWeight: 500,
      fontSize: "0.85rem",
      color: "#1976D2",
      backgroundColor: "rgba(25, 118, 210, 0.07)",
      borderRadius: "12px",
    }
  },
  reportButton: {
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.12)",
    }
  },
  statusCell: {
    textAlign: "center",
  },
  statusButton: {
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "0.8rem",
    fontWeight: 600,
    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
    "&.MuiButton-root": {
      borderRadius: "20px",
      textTransform: "none",
    }
  },
  paidStatus: {
    backgroundColor: "#C0F2C9",
    color: "#2E7D32",
    border: "1px solid #98C0A1",
  },
  pendingStatus: {
    backgroundColor: "#CCCFEB",
    color: "#3F51B5",
    border: "1px solid #A4A7C3",
  },
  missedStatus: {
    backgroundColor: "#FAC8C9",
    color: "#C62828",
    border: "1px solid #D2A0A1",
  }
}));

export default useStyles;