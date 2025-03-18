import React from "react";
import Card1Image from "../../assests/vectors/Card1_NewOffenders_ReportTime.svg";
import Card2Image from "../../assests/vectors/Card2_FineAnalysis.svg";
import Card3Image from "../../assests/vectors/Card3_LitterTrend.svg";
import LitterFromCar from "../../assests/images/LitterFromCar.jpg"
import LitterFromCar2 from "../../assests/images/LitterFromCarHighlight.jpg"
import ScaleUpGraph from "../../assests/vectors/ScaleUpGraph.svg"
import ScaleDownGraph from "../../assests/vectors/ScaleDownGraph.svg"
import HeatMap from "../../assests/vectors/HeatMap.svg"
import AwsIcon from "../../assests/vectors/tech_icons/aws_icon.svg";
import FastapiIcon from "../../assests/vectors/tech_icons/fastapi_icon.svg";
import FigmaIcon from "../../assests/vectors/tech_icons/figma_icon.svg";
import GithubIcon from "../../assests/vectors/tech_icons/github_icon.svg";
import KotlinIcon from "../../assests/vectors/tech_icons/kotlin_icon.svg";
import PostgresqlIcon from "../../assests/vectors/tech_icons/postgresql_icon.svg";
import PythonIcon from "../../assests/vectors/tech_icons/python-icon.svg";
import ReactIcon from "../../assests/vectors/tech_icons/react_icon.svg";
import TensorflowIcon from "../../assests/vectors/tech_icons/tensorflow_icon.svg";
import FacialRecognitionImage from "../../assests/vectors/FacialRecognitionID.svg"; 


import FinesMain from "../../assests/vectors/FinesMain.svg";
import NewIncidentsMain from "../../assests/vectors/NewIncidentsMain.svg";
import TotalReportsMain from "../../assests/vectors/TotalReportsMain.svg";
import LitterStatsMain from "../../assests/vectors/LitterStatsMain.svg";
import { BorderColor } from "@mui/icons-material";

const MainSection = () => {
  return (
    <div 
      style={{ 
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(60deg, #009370 0%, #009370 33.33%, #006A53 66.66%, #009370 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
        fontFamily: "'Onest', sans-serif",
      }}
    >
      {/* Content Container */}
      <div 
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "white",
          maxWidth: "90%",
          padding: "20px",
          marginTop: "5vh"
        }}
      >
        <h1 
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            lineHeight: "1.1"
          }}
        >
          Track Your Litter
        </h1>
        <h2
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            marginTop: "0",
            marginBottom: "2rem",
            lineHeight: "1.1"
          }}
        >
          Keep Your City Clean
        </h2>
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "3rem",
            maxWidth: "80%",
            margin: "0 auto 3rem",
            lineHeight: "1.6"
          }}
        >
          Detect litter in your area with TrashCam's AI-powered technology, using real-time
          computer vision and IoT to promote cleaner, safer spaces.
        </p>
      </div>
      
      {/* TotalReportsMain SVG in bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "40px",
          zIndex: 20,
          width: "400px", // Increased size
          height: "auto"
        }}
      >
        <img 
          src={TotalReportsMain} 
          alt="Total Reports" 
          style={{
            width: "100%",
            height: "auto"
          }}
        />
      </div>

      {/* FinesMain SVG positioned to the right */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "480px", // Adjusted positioning
          zIndex: 19,
          width: "400px", // Increased size
          height: "auto"
        }}
      >
        <img 
          src={FinesMain} 
          alt="Fines" 
          style={{
            width: "100%",
            height: "auto"
          }}
        />
      </div>

      {/* NewIncidentsMain SVG positioned above FinesMain */}
      <div
        style={{
          position: "absolute",
          bottom: "200px",
          left: "480px", // Adjusted positioning
          zIndex: 20,
          width: "400px", // Increased size
          height: "auto"
        }}
      >
        <img 
          src={NewIncidentsMain} 
          alt="New Incidents" 
          style={{
            width: "100%",
            height: "auto"
          }}
        />
      </div>

      {/* LitterStatsMain SVG on far right */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          zIndex: 20,
          width: "400px", // Increased size
          height: "auto"
        }}
      >
        <img 
          src={LitterStatsMain} 
          alt="Litter Stats" 
          style={{
            width: "100%",
            height: "auto"
          }}
        />
      </div>
      
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
        <img src={PythonIcon} alt="Python" style={techIconStyle} />
        <img src={ReactIcon} alt="React" style={techIconStyle} />
        <img src={PostgresqlIcon} alt="PostgreSQL" style={techIconStyle} />
        <img src={GithubIcon} alt="GitHub" style={techIconStyle} />
        <img src={KotlinIcon} alt="Kotlin" style={techIconStyle} />
        <img src={FastapiIcon} alt="FastAPI" style={techIconStyle} />
        <img src={FigmaIcon} alt="Figma" style={techIconStyle} />
        <img src={TensorflowIcon} alt="TensorFlow" style={techIconStyle} />
        <img src={AwsIcon} alt="AWS" style={techIconStyle} />
      </div>
    </div>
  );
};

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
    marginLeft: "330px",
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
    borderRadius: "15px",
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
        padding: "10px 20px",
        backgroundColor: "#FFF",
        border: "1px solid #DDD",
        borderRadius: "25px",
        fontSize: "0.9rem",
        fontWeight: "600",
        color: "#333",
        cursor: "pointer",
        textDecoration: "none",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        width: "fit-content",
        marginTop: "15px",
      };

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <div style={imageContainerStyle}>
          <img 
            src={LitterFromCar}
            alt="Car with litter detection" 
            style={imageStyle} 
          />
          <img 
            src={LitterFromCar2}
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

const FacialRecognitionSection = () => {
  const sectionStyle = {
    width: "100%",
    backgroundColor: "#F5FEFC", // Light purple background
    padding: "80px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Onest', sans-serif",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    width: "100%",
  };

  const textContainerStyle = {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingRight: "40px",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "600",
    color: "#333",
    margin: "0 0 10px 0",
  };

  const highlightStyle = {
    color: "#4B44EF", 
  };

  const descriptionStyle = {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#555",
    margin: "0 0 20px 0",
    fontWeight: "400",
  };

  const buttonStyle = {
        display: "inline-flex",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#FFF",
        border: "1px solid #DDD",
        borderRadius: "25px",
        fontSize: "0.9rem",
        fontWeight: "600",
        color: "#333",
        cursor: "pointer",
        textDecoration: "none",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.2s ease",
        width: "fit-content",
        marginTop: "15px",
      };

  const imageContainerStyle = {
    width: "55%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

  };

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        <div style={textContainerStyle}>
          <h2 style={titleStyle}>
            Accurately document littering incidents with <span style={highlightStyle}>Facial & Number Plate Recognition</span>
          </h2>
          <p style={descriptionStyle}>
            Easily capture and document littering incidents using advanced facial and number plate recognition technology. This ensures accurate identification of violators in real-time. With high precision, authorities can act quickly and efficiently to address issues promoting a cleaner, more responsible community.
          </p>
          <a href="#" style={buttonStyle}>Learn More →</a>
        </div>
        
        <div style={imageContainerStyle}>
          <img 
            src={FacialRecognitionImage} 
            alt="Facial Recognition ID Matching"
            style={{
              width: "100%",
              maxWidth: "450px",
              borderRadius: "15px",
              backgroundColor: "#EBE6FE",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const LitterTrendsSection = () => {
        const sectionStyle = {
          width: "100%",
          backgroundColor: "#FFFFFF",
          padding: "80px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Onest', sans-serif",
        };
      
        const containerStyle = {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1800px", // Increased maxWidth to allow more space for content
          width: "100%",
          gap: "80px", // Increased gap between the card and the text
        };
      
        const cardStyle = {
          width: "100%",
          maxWidth: "800px",
          padding: "10px",
          backgroundColor: "#E8F4FF",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align items to the start (left)
          height: "450px",
        };
      
        // New heading style for Islamabad
        const headingStyle = {
          color: "#333",
          fontSize: "1.8rem",
          fontWeight: "700",
          margin: "20px 0px 0px 20px", // Adjusted margin to move it to the top left
          alignSelf: "flex-start", // Ensure the heading aligns to the left
        };
      
        // Modified to contain the images in a row
        const imagesContainerStyle = {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        };
      
        const contentContainerStyle = {
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "600px", // Increased maxWidth for the content section
        };
      
        const titleStyle = {
          color: "#333",
          fontSize: "1.6rem",
          margin: 0,
          fontWeight: "600",
        };
      
        const textStyle = {
          color: "#555",
          lineHeight: "1.6",
          fontSize: "1rem",
          margin: 0,
          fontWeight: "400",
        };
      
        const buttonStyle = {
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#FFF",
                border: "1px solid #DDD",
                borderRadius: "25px",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#333",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease",
                width: "fit-content",
                marginTop: "15px",
              };
      
        const imageContainerStyle = {
          flex: 1,
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        };
      
        const imageStyle = {
          width: "100%",
          maxWidth: "400px",
          height: "350px",
          objectFit: "contain",
        };
      
        return (
          <div style={sectionStyle}>
            <div style={containerStyle}>
              <div style={cardStyle}>
                {/* Added Islamabad heading */}
                <h1 style={headingStyle}>Islamabad</h1>
                <div style={imagesContainerStyle}>
                  <div style={imageContainerStyle}>
                    <img 
                      src={ScaleUpGraph} 
                      alt="Littering trends visualization" 
                      style={imageStyle}
                    />
                  </div>
                  
                  <div style={imageContainerStyle}>
                    <img 
                      src={ScaleDownGraph} 
                      alt="Real-time monitoring" 
                      style={imageStyle}
                    />
                  </div>
                </div>
              </div>
      
              <div style={contentContainerStyle}>
                <h2 style={titleStyle}>
                  Track citywide littering trends <span style={{ color: "#4566EA" }}>In Real-Time</span>
                </h2>
                <p style={textStyle}>
                  Visualize litter hotspots and monitor violation rates with detailed insights to optimize citywide cleanup efforts.
                  Visualize litter hotspots and monitor violation rates with detailed insights to optimize citywide cleanup efforts.
                  Visualize litter hotspots and monitor violation rates with detailed insights to optimize citywide cleanup efforts.
                  Visualize litter hotspots and monitor violation rates with detailed insights to optimize citywide cleanup efforts.
                  Visualize litter hotspots and monitor violation rates with detailed insights to optimize citywide cleanup efforts.
                </p>
                <a href="#" style={buttonStyle}>Learn More →</a>
              </div>
            </div>
          </div>
        );
      };

const MapSection = () => {
        const sectionStyle = {
          width: "100%",
          backgroundColor: "#FFFFFF",
          padding: "80px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Onest', sans-serif",
        };
      
        const containerStyle = {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          maxWidth: "1600px",
          width: "100%",
          gap: "40px",
        };
      
        const contentContainerStyle = {
          flex: "0 0 45%",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        };
      
        const titleContainerStyle = {
          marginBottom: "12px",
        };
      
        const titleStyle = {
          color: "#1A2754",
          fontSize: "1.8rem",
          margin: 0,
          fontWeight: "700",
          lineHeight: "1.3",
        };
      
        const highlightStyle = {
          color: "#4566EA",
          textDecoration: "none",
        };
      
        const textStyle = {
          color: "#666",
          lineHeight: "1.6",
          fontSize: "1rem",
          margin: "0 0 10px 0",
          fontWeight: "400",
        };
      
        const buttonStyle = {
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#FFF",
                border: "1px solid #DDD",
                borderRadius: "25px",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: "#333",
                cursor: "pointer",
                textDecoration: "none",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s ease",
                width: "fit-content",
                marginTop: "15px",
              };
      
        const cardStyle = {
          flex: "0 0 45%",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
        };
      
        const mapImageStyle = {
          width: "100%",
          height: "auto",
          display: "block",
        };
      
        return (
          <div style={sectionStyle}>
            <div style={containerStyle}>
              {/* Content on the left */}
              <div style={contentContainerStyle}>
                <div style={titleContainerStyle}>
                  <h2 style={titleStyle}>
                    Track Littering Activity with <span style={highlightStyle}>Detection &<br />Reporting Tools</span>
                  </h2>
                </div>
                <p style={textStyle}>
                  Monitor littering in real-time and identify high-violation areas. Use 
                  this data to streamline cleanup efforts and enhance enforcement, 
                  ensuring cleaner and safer public spaces.
                </p>
                <a href="#" style={buttonStyle}>Learn More →</a>
              </div>
      
              {/* Map Card on the right */}
              <div style={cardStyle}>
                <img 
                  src={HeatMap}
                  alt="Litter Map Heatmap View" 
                  style={mapImageStyle}
                />
              </div>
            </div>
          </div>
        );
      };
      
const HeroBanner = () => {
return (
        <div 
        style={{ 
        width: "70vw",
        minHeight: "40vh",
        background: "linear-gradient(60deg, #009370 0%, #009370 33.33%, #006A53 66.66%, #009370 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
        fontFamily: "'Onest', sans-serif",
        color: "#FFFFFF",
        textAlign: "center",
        borderRadius: "50px", // Curved borders
        margin: "auto", // Center the banner
        overflow: "hidden", // Ensure content respects the border radius
        marginBottom: "3rem",
        marginTop: "20rem",

        }}
        >
        {/* Hero Content */}
        <h1 style={{ fontSize: "3rem", fontWeight: "600", marginBottom: "1rem" }}>
        Be the Change the World Needs!
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2.5rem", maxWidth: "600px" }}>
        Join TrashCams mission and keep our communities clean.
        </p>
        
        {/* Email Input and Button */}
        <div style={{ 
        display: "flex", 
        backgroundColor: "#FFFFFF", 
        borderRadius: "50px", 
        padding: "0.5rem", 
        width: "100%", 
        maxWidth: "450px",
        marginBottom: "1rem"
        }}>
        <input 
        type="email" 
        placeholder="Enter your email" 
        style={{ 
                flex: 1, 
                border: "none", 
                outline: "none", 
                padding: "0.75rem 1.5rem", 
                borderRadius: "50px",
                fontSize: "1rem",
                fontFamily: "'Onest', sans-serif"
        }} 
        />
        <button style={{ 
        backgroundColor: "#009370", 
        color: "#FFFFFF", 
        border: "none", 
        borderRadius: "50px", 
        padding: "0.75rem 1.5rem", 
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "1rem",
        fontFamily: "'Onest', sans-serif"
        }}>
        Get started
        </button>
        </div>
        
        <p style={{ fontSize: "0.8rem", opacity: "0.8" }}>
        By clicking Sign Up you're confirming that you agree with our Terms and Conditions.
        </p>

        </div>

);
};


const NavigationBar = () => {
        const navStyle = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          padding: "0.1rem 5%", // Reduced vertical padding
          background: "linear-gradient(60deg, #009370 0%, #009370 17.33%, #006A53 59.66%, #009370 100%)",
          zIndex: 1000,
          fontFamily: "'Onest', sans-serif",
          height: "60px", // Explicit height control
        };
      
        const logoStyle = {
          height: "35px", // Adjust size as needed
          flexShrink: 0, // Prevents shrinking
        };
      
        const navLinksContainerStyle = {
          display: "flex",
          flexGrow: 1, // Takes up available space
          justifyContent: "center", // Centers the links
        };
      
        const navLinksStyle = {
          display: "flex",
          gap: "2rem", // Reduced gap
          alignItems: "center",
        };
      
        const linkStyle = {
          color: "rgba(255, 255, 255, 0.9)",
          textDecoration: "none",
          fontSize: "0.95rem",
          fontWeight: "500",
          transition: "all 0.2s ease",
        };
      
        const buttonStyle = {
          backgroundColor: "transparent",
          borderColor: "#fff",
          color: "#fff",
          padding: "0.6rem 1.2rem",
          borderRadius: "20px",
          textDecoration: "none",
          fontWeight: "100",
          transition: "all 0.2s ease",
          border: "1px solid #fff",
          marginLeft: "auto", // Pushes the button to the right
        };
      
        return (
          <nav style={navStyle}>
            <a href="/">
              <img src="/logo_white.svg" alt="TrashCam Logo" style={logoStyle} />
            </a>
            <div style={navLinksContainerStyle}>
              <div style={navLinksStyle}>
                <a href="#features" style={linkStyle}>Feature Blog</a>
                <a href="#about" style={linkStyle}>About Us</a>
                <a href="#blog" style={linkStyle}>Blog</a>
                <a href="#contact" style={linkStyle}>Contact Us</a>
              </div>
            </div>
            <a href="#get-started" style={buttonStyle}>Get started</a>
          </nav>
        );
      };
      
      
      
      
      

      



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
      <FacialRecognitionSection />
      <LitterTrendsSection />
      <MapSection />
      <HeroBanner />
      <NavigationBar />
    </div>
  );
};

export default Landing;