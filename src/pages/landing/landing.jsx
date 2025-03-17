import React from "react";

import Card1Image from "../../assests/vectors/Card1_NewOffenders_ReportTime.svg";
import Card2Image from "../../assests/vectors/Card2_FineAnalysis.svg";
import Card3Image from "../../assests/vectors/Card3_LitterTrend.svg";

// Import tech icons
import AwsIcon from "../../assests/vectors/tech_icons/aws_icon.svg";
import FastapiIcon from "../../assests/vectors/tech_icons/fastapi_icon.svg";
import FigmaIcon from "../../assests/vectors/tech_icons/figma_icon.svg";
import GithubIcon from "../../assests/vectors/tech_icons/github_icon.svg";
import KotlinIcon from "../../assests/vectors/tech_icons/kotlin_icon.svg";
import PostgresqlIcon from "../../assests/vectors/tech_icons/postgresql_icon.svg";
import PythonIcon from "../../assests/vectors/tech_icons/python-icon.svg";
import ReactIcon from "../../assests/vectors/tech_icons/react_icon.svg";
import TensorflowIcon from "../../assests/vectors/tech_icons/tensorflow_icon.svg";

// Main Section Component
const MainSection = () => {
  return (
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
        position: "relative",
        fontFamily: "'Onest', sans-serif", // Apply Onest font
      }}
    >
      {/* White Wave Overlay */}
      <svg 
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100vh" }} 
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill="#FFFFFF" 
          d="M0,400 C180,350 360,250 540,250 C720,250 900,350 1080,350 C1260,350 1440,250 1440,250 L1440,500 L0,500 Z"
        />
      </svg>
    </div>
  );
};

// Tech Icons Section Component
const TechIconsSection = () => {
  const techSectionStyle = {
    backgroundColor: "#FFFFFF",
    padding: "60px 20px 100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    overflowX: "auto",
    fontFamily: "'Onest', sans-serif", // Apply Onest font
  };

  const techTitleStyle = {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "40px",
    textAlign: "center",
    fontWeight: "600", // Onest font weight
  };

  const techIconsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: "70px",
    minWidth: "min-content",
    padding: "0 20px",
  };

  const techIconStyle = {
    height: "100px",
    width: "100px",
    objectFit: "contain",
    transition: "transform 0.2s ease",
    cursor: "pointer",
    flexShrink: 0,
  };

  return (
    <div style={techSectionStyle}>
      <h2 style={techTitleStyle}>Technologies Used</h2>
      <div style={techIconsContainerStyle}>
        <img src={AwsIcon} alt="AWS" style={techIconStyle} />
        <img src={ReactIcon} alt="React" style={techIconStyle} />
        <img src={GithubIcon} alt="GitHub" style={techIconStyle} />
        <img src={PostgresqlIcon} alt="PostgreSQL" style={techIconStyle} />
        <img src={PythonIcon} alt="Python" style={techIconStyle} />
        <img src={KotlinIcon} alt="Kotlin" style={techIconStyle} />
        <img src={FastapiIcon} alt="FastAPI" style={techIconStyle} />
        <img src={FigmaIcon} alt="Figma" style={techIconStyle} />
        <img src={TensorflowIcon} alt="TensorFlow" style={techIconStyle} />
      </div>
    </div>
  );
};

// Cards Section Component
const CardsSection = () => {
  const cardsContainer = {
    display: "flex",
    flexWrap: "nowrap",
    gap: "80px",
    justifyContent: "center",
    maxWidth: "1400px",
    padding: "20px",
    width: "100%",
  };

  const cardStyle = {
    padding: 0,
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    width: "500px",
    minHeight: "300px",
    transition: "transform 0.3s ease",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    fontFamily: "'Onest', sans-serif", // Apply Onest font
  };

  const imageContainerStyle = {
    height: "250px",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "35px",
    boxSizing: "border-box",
    transform: "scale(1.2)",
    marginTop: "15px",
  };

  const contentContainerStyle = {
    padding: "30px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const titleStyle = {
    color: "#000",
    fontSize: "1.5rem",
    margin: 0,
    fontWeight: "600", // Onest font weight
  };

  const textStyle = {
    color: "#555",
    lineHeight: "1.6",
    fontSize: "1rem",
    margin: 0,
    fontWeight: "400", // Onest font weight
  };

  const linkStyle = {
    fontSize: "1rem",
    color: "#007BFF",
    fontWeight: "600", // Onest font weight
    textDecoration: "none",
    marginTop: "auto",
    alignSelf: "flex-start",
  };

  return (
    <div 
      style={{ 
        width: "100%",
        backgroundColor: "#F5FEFC",
        minHeight: "50vh",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowX: "hidden",
        fontFamily: "'Onest', sans-serif", // Apply Onest font
      }}
    >
      <div style={cardsContainer}>
        {/* Left Card - Light Blue */}
        <div style={{ ...cardStyle, backgroundColor: "#E8F3FF" }}>
          <div style={imageContainerStyle}>
            <img src={Card1Image} alt="Card1 Image" style={imageStyle} />
          </div>
          <div style={contentContainerStyle}>
            <h2 style={titleStyle}>Autopilot</h2>
            <p style={textStyle}>
              Empower our AI engine to manage the purchase and sale of reserved 
              instances, effectively optimizing your AWS expenditure.
            </p>
            <a href="#" style={linkStyle}>Learn more →</a>
          </div>
        </div>

        {/* Middle Card - Light Green */}
        <div style={{ ...cardStyle, backgroundColor: "#EAFBF2" }}>
          <div style={imageContainerStyle}>
            <img src={Card2Image} alt="Fine Analysis" style={imageStyle} />
          </div>
          <div style={contentContainerStyle}>
            <h2 style={titleStyle}>Cost Explorer</h2>
            <p style={textStyle}>
              Gain actionable insights through thorough analysis of your usage behaviors, uncovering fresh savings possibilities.
            </p>
            <a href="#" style={linkStyle}>Learn more →</a>
          </div>
        </div>

        {/* Right Card - Light Gray */}
        <div style={{ ...cardStyle, backgroundColor: "#F7F7F7" }}>
          <div style={imageContainerStyle}>
            <img src={Card3Image} alt="Litter Trends" style={imageStyle} />
          </div>
          <div style={contentContainerStyle}>
            <h2 style={titleStyle}>Quantum Secure</h2>
            <p style={textStyle}>
              Ensure your data remains protected with our advanced quantum-resistant encryption methods without entanglements.
            </p>
            <a href="#" style={linkStyle}>Learn more →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// DetectLitter Section Component
const DetectLitterSection = () => {
  const sectionStyle = {
    width: "100%",
    backgroundColor: "#FFFFF",
    padding: "80px 20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "'Onest', sans-serif", // Apply Onest font
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "1200px",
    width: "100%",
    gap: "120px",
    marginLeft: "230px",
  };

  const imageContainerStyle = {
    width: "80%",
    backgroundColor: "#E6F7FF",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid #E0E0E0",
    padding: "50px",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  };

  const textContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "600", // Onest font weight
    color: "#333",
    margin: "0 0 10px 0",
  };

  const highlightStyle = {
    color: "#4566EA",
  };

  const descriptionStyle = {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
    margin: "0 0 20px 0",
    fontWeight: "400", // Onest font weight
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#FFF",
    border: "1px solid #DDD",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600", // Onest font weight
    color: "#333",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s ease",
    width: "fit-content",
  };

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <img 
            src={Card3Image}
            alt="Car with litter detection" 
            style={imageStyle} 
          />
          <img 
            src={Card2Image}
            alt="Highway litter detection" 
            style={imageStyle} 
          />
        </div>
        
        <div style={textContainerStyle}>
          <h2 style={titleStyle}>
            Identify and Fine <span style={highlightStyle}>Offenders in Real-Time</span>
          </h2>
          <p style={descriptionStyle}>
            AI-driven systems detect littering instantly, using surveillance, facial recognition, 
            and license plate reading to issue fines on the spot promoting cleaner public spaces.
          </p>
          <p style={descriptionStyle}>
            Our technology enables authorities to enforce anti-littering laws effectively and efficiently.
            The automated system reduces the need for manual monitoring and increases the rate of detection.
          </p>
          <a href="#" style={buttonStyle}>Learn More →</a>
        </div>
      </div>
    </div>
  );
};

// Main Landing Component
const Landing = () => {
  const globalStyle = document.createElement("style");
  globalStyle.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;600&display=swap');
    
    body, html { 
      margin: 0; 
      padding: 0; 
      overflow-x: hidden; 
      font-family: 'Onest', sans-serif; // Apply Onest font globally
    }
    
    @media (max-width: 1200px) {
      #tech-icons-container {
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 20px;
      }
    }
  `;
  document.head.appendChild(globalStyle);

  return (
    <div style={{ overflowX: "hidden", width: "100vw", margin: 0, padding: 0 }}>
      <MainSection />
      <TechIconsSection />
      <CardsSection />
      <DetectLitterSection />
    </div>
  );
};

export default Landing;