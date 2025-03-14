// styles.js
const styles = {
  sidebar: {
    position: "fixed",
    height: "100vh",
    width: "300px",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
  sidebarContent: {
    flexGrow: 1,
  },
  greenStrip: {
    width: "8px",
    height: "100%",
    backgroundColor: "#065E4A",
    position: "absolute",
    right: 0,
    top: 0,
  },
  sidebarLogo: {
    width: "60%",
    height: "auto",
    marginTop: "15px",
    marginLeft: "15px",
    filter:
      "brightness(0) saturate(300%) invert(38%) sepia(670%) saturate(300%) hue-rotate(90deg) brightness(60%) contrast(100%)",
  },
  sidebarSearch: {
    width: "90%",
    margin: "40px 0 20px 15px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #cfd8dc",
    borderRadius: "20px",
    padding: "8px",
    backgroundColor: "white",
  },
  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "#333",
    fontSize: "1rem",
  },
  searchIcon: {
    color: "#555",
    marginRight: "10px",
  },
  menuBadge: {
    backgroundColor: "transparent",
    color: "#065E4A",
    border: "1px solid #065E4A",
    borderRadius: "12px",
    padding: "2px 6px",
    fontSize: "0.75rem",
    marginLeft: "auto",
  },
};

export default styles;
