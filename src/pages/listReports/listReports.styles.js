import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  report: {
    position: "fixed",
    height: "100vh",
    width: "calc(100vw - 300px)",
    top: 0,
    left: 300,
    backgroundColor: "#F9FAFC",
    display: "flex",
    flexDirection: "column",
    padding: "20px 40px",
  },
  reportHeader: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "1.2rem",
    color: "#333333",
    marginBottom: "20px",
    textAlign: "left",
    width: "100%",
  },
  reportContent: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "75%",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    padding: "20px",
    overflow: "hidden",
  },
  tableContainer: {
    width: "100%",
    overflowY: "auto",
    border: "none",
    boxShadow: "none",
    height: "100%",
  },
  tableHeader: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#666666",
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    borderBottom: "1px solid #EEEEEE",
    padding: "10px 16px",
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F9FAFC",
    },
    "& .MuiTableCell-root": {
      padding: "16px",
      fontSize: "0.9rem",
      borderBottom: "1px solid #EEEEEE",
    },
  },
}));

export default useStyles;
