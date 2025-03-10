import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  report: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 300,
    backgroundColor: "#F4F7F8",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  reportHeader: {
    fontFamily: "'Source Sans Pro', sans-serif",
    fontSize: "1rem",
    color: "#212529",
    paddingLeft: 40,
    width: "100%"
  },
  reportContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20
  },
  textField: {
    minWidth: 200,
    maxWidth: 250,
    margin: 10
  },
  formControl: {
    minWidth: 200,
    maxWidth: 250,
    margin: 10
  },
  reportChartCard: {
    background: "white",
    borderRadius: 25,
    width: "70%",
    maxWidth: 3000,
    height: "90%",
    position: "relative",
    marginTop: 0,
    marginLeft: "5%",
    display: "flex",
    flexDirection: "column",
    padding: 40,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  tableContainer: {
    maxHeight: 700,
    width: "100%",
    overflowY: "auto"
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 1
  },
  tableRow: {
    transition: "background-color 0.3s ease",
    cursor: "pointer"
  },
  rowSeparator: {
    width: "100%",
    height: 1,
    backgroundColor: "#dcdcdc"
  }
}));

export default useStyles;
