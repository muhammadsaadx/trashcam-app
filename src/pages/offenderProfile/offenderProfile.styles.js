const styles = {
  container: {
    position: 'fixed',
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'Source Sans Pro', sans-serif",
    overflow: 'hidden',
  },
  mainContent: {
    flex: '1',
    marginLeft: '250px',
    padding: '2rem',
    maxWidth: '100%',
    overflow: 'hidden',
    transition: 'margin-left 0.3s ease',
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
    margin: "0 0 0 4rem",
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
  "@media (max-width: 768px)": {
    mainContent: {
      marginLeft: '0',
      maxWidth: '100%',
      padding: '1rem',
    },
    headerContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "1rem",
    },
    reportId: {
      alignSelf: "flex-start",
    },
  },
};

export default styles;