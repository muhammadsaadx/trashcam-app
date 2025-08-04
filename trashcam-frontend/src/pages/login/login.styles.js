const styles = {
  loginContainer: {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  loginForm: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  sidebarLogo: {
    width: "30%",
    margin: "12% 0 2rem 10%",
    filter:
      "brightness(0) saturate(300%) invert(38%) sepia(670%) saturate(300%) hue-rotate(90deg) brightness(60%) contrast(100%)",
  },
  form: {
    maxWidth: "400px",
    padding: "0 2rem",
    marginLeft: "10%",
  },
  heading: {
    color: "#333",
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#666",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 0",
    border: "none",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  inputFocus: {
    borderBottomColor: "#006B54",
  },
  button: {
    width: "100%",
    padding: "0.875rem",
    backgroundColor: "#006B54",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "2rem",
  },
  buttonHover: {
    backgroundColor: "#487e73",
  },
};

export default styles;
