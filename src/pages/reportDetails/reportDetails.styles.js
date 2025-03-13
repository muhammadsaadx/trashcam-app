const styles = {
  container: {
    background: "#f8fafb",
    minHeight: "100vh",
    padding: "2rem calc(300px + 2rem)",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
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
  },
  reportDetails: {
    flex: 1,
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
  },
  offendersSection: {
    flex: 1,
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
  },
  detailsSection: {
    flex: 1,
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
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
    minHeight: "300px",
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

  /** Map Styling **/
  mapSection: {
    flex: 1,
    background: "#fff",
    borderRadius: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "2rem",
    maxWidth: "50%",
  },
  mapTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#2d3436",
  },
  mapWrapper: {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    border: "2px solid #ddd",
  },
};

export default styles;
