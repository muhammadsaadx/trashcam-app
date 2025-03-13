// reportDetails.styles.js
const styles = {
  report: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 300,
    backgroundColor: "#F4F7F8",
  },
  reportHeader: {
    fontSize: "1rem",
    color: "#212529",
    paddingLeft: "40px",
  },
  reportContent: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "50px",
    gap: "15px",
  },
  personalDetailsChartCard: {
    background: "white",
    borderRadius: "25px",
    width: "40%",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "black",
    display: "flex",
    justifyContent: "space-between",
  },
  personalDetails: {
    width: "60%",
    marginRight: "10px",
    fontSize: "1.1rem",
    lineHeight: 1.6,
  },
  idCardImage: {
    width: "70%",
    textAlign: "center",
    marginLeft: 0,
  },
  idCardImg: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
  },
  loadingScreen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    fontSize: "24px",
    color: "#333",
  },
  // Media query will need to be handled differently in JSS
};

export default styles;  