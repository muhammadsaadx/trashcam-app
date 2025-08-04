const styles = {
  container: {
    position: 'fixed',
    display: 'flex', // Flex layout
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'Source Sans Pro', sans-serif",
    overflow: 'hidden', // Prevent horizontal and vertical scrolling
  },
  mainContent: {
    flex: '1',
    marginLeft: '250px', // Match your sidebar width
    padding: '2rem',
    maxWidth: '100%', // Ensure content respects sidebar space
    overflow: 'hidden', // Prevent content overflow
    transition: 'margin-left 0.3s ease', // Smooth transition for responsive design
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
    margin: "0 0 0 4rem", // Added left margin to shift it right
  },
  
  reportId: {
    fontSize: "1rem",
    color: "#636e72",
    fontWeight: "500",
    backgroundColor: "#f5fbf7",
    padding: "0.5rem 1.2rem",
    borderRadius: "15px",
    minWidth: "120px",
    textAlign: "center",
  },
  
  reportDetails: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  offendersSection: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  fineStatusSection: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  detailsText: {
    textAlign: "justify",
    marginTop: "0.5rem",
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
    color: "#2980b9",
    textDecoration: "underline",
    cursor: "pointer",
  },
  mapSection: {
    width: "108%",
    height: "300px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  
  
};

export default styles;
