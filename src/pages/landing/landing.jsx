import React from "react";
import LineGraph from "../../assests/vectors/LineGraph.svg"; // Import the SVG

const Landing = () => {
  return (
    <div style={{ overflowX: "hidden", width: "100vw", margin: 0, padding: 0 }}>
      {/* Green Background Section */}
      <div 
        style={{ 
          width: "100vw",
          minHeight: "100vh",
          background: "linear-gradient(60deg, #009370 0%, #009370 33.33%, #006A53 66.66%, #009370 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box",
          position: "relative"
        }}
      >
        {/* White Wave Overlay */}
        <svg 
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100vh" }} 
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="white" 
            d="M0,400 C180,350 360,250 540,250 C720,250 900,350 1080,350 C1260,350 1440,250 1440,250 L1440,500 L0,500 Z"
          />
        </svg>
      </div>

      {/* Cards Section */}
      <div 
        style={{ 
          width: "100%",
          backgroundColor: "white",
          minHeight: "50vh",
          padding: "60px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "hidden"
        }}
      >
        <div style={cardsContainer}>
          {/* Left Card - Light Blue */}
          <div style={{ ...cardStyle, backgroundColor: "#E8F3FF" }}>
          <img src={LineGraph} alt="Line Graph Trends" style={imageStyle} />
            <h2 style={titleStyle}>Autopilot</h2>
            <p style={textStyle}>
              Empower our AI engine to manage the purchase and sale of reserved 
              instances, effectively optimizing your AWS expenditure.
            </p>
            <a href="#" style={linkStyle}>Learn more →</a>
          </div>

          {/* Middle Card - Light Green */}
          <div style={{ ...cardStyle, backgroundColor: "#EAFBF2" }}>
          <img src={LineGraph} alt="Line Graph Trends" style={imageStyle} />
            <h2 style={titleStyle}>Autopilot</h2>
            <p style={textStyle}>
              Empower our AI engine to manage the purchase and sale of reserved 
              instances, effectively optimizing your AWS expenditure.
            </p>
            <a href="#" style={linkStyle}>Learn more →</a>
          </div>

          {/* Right Card - Light Gray */}
          <div style={{ ...cardStyle, backgroundColor: "#F7F7F7" }}>
          <img src={LineGraph} alt="Line Graph Trends" style={imageStyle} />
            <h2 style={titleStyle}>Autopilot</h2>
            <p style={textStyle}>
              Empower our AI engine to manage the purchase and sale of reserved 
              instances, effectively optimizing your AWS expenditure.
            </p>
            <a href="#" style={linkStyle}>Learn more →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardsContainer = {
        display: "flex",
        flexWrap: "nowrap", // Changed from wrap to nowrap
        gap: "80px",
        justifyContent: "center",
        maxWidth: "1400px", // Increased from 1200px to account for larger gap
        padding: "20px",
        width: "100%",
      };

const cardStyle = {
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  width: "500px",
  minHeight: "300px",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  textAlign: "left",
};

const subtitleStyle = {
  fontSize: "1rem",
  fontWeight: "600",
  color: "#333",
};

const largeNumberStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#000",
  margin: "5px 0",
};

const percentageStyle = {
  fontSize: "0.9rem",
  color: "#008000",
  fontWeight: "bold",
};

const titleStyle = {
  color: "#000",
  fontSize: "1.5rem",
  margin: "15px 0",
  fontWeight: "bold",
};

const textStyle = {
  color: "#555",
  lineHeight: "1.6",
  fontSize: "1rem",
};

const smallTextStyle = {
  fontSize: "0.9rem",
  color: "#666",
};

const linkStyle = {
  fontSize: "1rem",
  color: "#007BFF",
  fontWeight: "bold",
  textDecoration: "none",
  marginTop: "10px",
  display: "inline-block",
};

const imageStyle = {
  width: "130%",
  height: "auto",
  marginTop: "10px",
};

// Remove default body margin and padding globally
const globalStyle = document.createElement("style");
globalStyle.innerHTML = `body, html { margin: 0; padding: 0; overflow-x: hidden; }`;
document.head.appendChild(globalStyle);

export default Landing;
