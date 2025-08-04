const STATUS_STYLES = {
  Paid: { border: "#98C0A1", background: "#C0F2C9" },
  Pending: { border: "#A4A7C3", background: "#CCCFEB" },
  Missed: { border: "#D2A0A1", background: "#FAC8C9" },
  default: { border: "#C8C8C8", background: "#FFFFFF" },
};

const getFineStatusStyle = (status) => ({
  backgroundColor: STATUS_STYLES[status]?.background || STATUS_STYLES.default.background,
  color: "black",
  borderRadius: 7,
  border: `1px solid ${STATUS_STYLES[status]?.border || STATUS_STYLES.default.border}`,
  padding: "4px 16px",
  fontWeight: 500,
  textTransform: "none",
  fontSize: "0.75rem",
  minWidth: 80
});

const styles = {
  container: {
    position: "fixed",
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    fontFamily: "'Source Sans Pro', sans-serif",
    overflow: "hidden",
  },
  mainContent: {
    flex: "1",
    marginLeft: "350px",
    padding: "2rem",
    maxWidth: "100%",
    overflow: "hidden",
    transition: "margin-left 0.3s ease",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    width: "90%",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2d3436",
    letterSpacing: "-0.5px",
    margin: "0 0 0 -1rem",
  },
  offenderid: {
    fontSize: "1rem",
    color: "#636e72",
    fontWeight: "500",
    backgroundColor: "#f5fbf7",
    padding: "0.5rem 1.2rem",
    borderRadius: "15px",
    minWidth: "120px",
    textAlign: "center",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    width: "100%",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  offencesSection: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "90%",
  },
  personalSection: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "80%",
  },
  personalInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  personalDetails: {
    flex: "1",
  },
  idCardContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 10px",
  },
  idCardImage: {
    maxWidth: "100%",
    maxHeight: "200px",
    objectFit: "contain",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  tableHeader: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#DFFFE0",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
  },
  spinner: {
    color: "#2ecc71",
    marginBottom: "1rem",
  },
  loadingText: {
    color: "#636e72",
    fontSize: "1.1rem",
  },
};

export { styles, getFineStatusStyle };