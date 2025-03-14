const styles = {
  container: {
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    top: '5%',
    left: '18%',
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    width: "100%",
    maxWidth: "1200px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#2d3436",
    letterSpacing: "-0.5px",
    margin: 0,
  },
  reportId: {
    fontSize: "1rem",
    color: "#636e72",
    fontWeight: "500",
    backgroundColor: "#f5fbf7",
    padding: "0.5rem 1.2rem",
    borderRadius: "15px",
  },
  row: {
    display: "flex",
    gap: "2rem",
    alignItems: "flex-start",
    flexWrap: "wrap",
    justifyContent: "center",
    maxWidth: "1200px",
    width: "100%",
  },
  reportDetails: {
    flex: 1,
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "60%",
  },
  col: {
    flex: 1,
  },
  offendersSection: {
    flex: 1,
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    minWidth: "150%",
  },
  detailsText: {
    textAlign: "justify",
    marginTop: "0.5rem",
  },
  
  spinner: {
    color: "#2ecc71",
    marginBottom: "1rem",
  },
  loadingText: {
    color: "#636e72",
    fontSize: "1.1rem",
    marginTop: "1rem",
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
  clickableText: {
    color: "black",
    textDecoration: "underline",
    cursor: "pointer",
  },
  mapSection: {
    marginTop: "2rem",
    width: '162%',
    height: '300px',
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }
};

export default styles;