import React from "react";
import {
  mainSectionStyle,
  contentContainerStyle,
  mainTitleStyle,
  mainSubtitleStyle,
  mainParagraphStyle,
  totalReportsStyle,
  finesMainStyle,
  newIncidentsMainStyle,
  litterStatsMainStyle,
  waveOverlayStyle,
  techSectionStyle,
  techTitleStyle,
  techIconsContainerStyle,
  techIconStyle,
  cardsContainerStyle,
  cardStyle,
  imageContainerStyle,
  imageStyle,
  contentContainerStyle as cardContentContainerStyle,
  titleStyle as cardTitleStyle,
  textStyle as cardTextStyle,
  linkStyle as cardLinkStyle,
  detectLitterSectionStyle,
  detectLitterContainerStyle,
  detectLitterImageContainerStyle,
  detectLitterImageStyle,
  detectLitterTextContainerStyle,
  detectLitterTitleStyle,
  detectLitterHighlightStyle,
  detectLitterDescriptionStyle,
  detectLitterButtonStyle,
  facialRecognitionSectionStyle,
  facialRecognitionContainerStyle,
  facialRecognitionTextContainerStyle,
  facialRecognitionTitleStyle,
  facialRecognitionHighlightStyle,
  facialRecognitionDescriptionStyle,
  facialRecognitionButtonStyle,
  facialRecognitionImageContainerStyle,
  litterTrendsSectionStyle,
  litterTrendsContainerStyle,
  litterTrendsCardStyle,
  litterTrendsHeadingStyle,
  litterTrendsImagesContainerStyle,
  litterTrendsContentContainerStyle,
  litterTrendsTitleStyle,
  litterTrendsTextStyle,
  litterTrendsButtonStyle,
  litterTrendsImageContainerStyle,
  litterTrendsImageStyle,
  mapSectionStyle,
  mapContainerStyle,
  mapContentContainerStyle,
  mapTitleContainerStyle,
  mapTitleStyle,
  mapHighlightStyle,
  mapTextStyle,
  mapButtonStyle,
  mapCardStyle,
  mapImageStyle,
  heroBannerStyle,
  heroTitleStyle,
  heroParagraphStyle,
  heroInputContainerStyle,
  heroInputStyle,
  heroButtonStyle,
  heroDisclaimerStyle,
  navStyle,
  logoStyle,
  navLinksContainerStyle,
  navLinksStyle,
  navLinkStyle,
  navButtonStyle,
} from "./landing.styles";

import Card1Image from "../../assests/vectors/Card1_NewOffenders_ReportTime.svg";
import Card2Image from "../../assests/vectors/Card2_FineAnalysis.svg";
import Card3Image from "../../assests/vectors/Card3_LitterTrend.svg";
import LitterFromCar from "../../assests/images/LitterFromCar.jpg";
import LitterFromCar2 from "../../assests/images/LitterFromCarHighlight.jpg";
import ScaleUpGraph from "../../assests/vectors/ScaleUpGraph.svg";
import ScaleDownGraph from "../../assests/vectors/ScaleDownGraph.svg";
import HeatMap from "../../assests/vectors/HeatMap.svg";
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

const MainSection = () => {
  return (
    <div style={mainSectionStyle}>
      <div style={contentContainerStyle}>
        <h1 style={mainTitleStyle}>Track Your Litter</h1>
        <h2 style={mainSubtitleStyle}>Keep Your City Clean</h2>
        <p style={mainParagraphStyle}>If you can't do the Fine don't do the Crime!</p>
      </div>

      <div style={totalReportsStyle}>
        <img src={TotalReportsMain} alt="Total Reports" style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={finesMainStyle}>
        <img src={FinesMain} alt="Fines" style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={newIncidentsMainStyle}>
        <img src={NewIncidentsMain} alt="New Incidents" style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={litterStatsMainStyle}>
        <img src={LitterStatsMain} alt="Litter Stats" style={{ width: "100%", borderRadius: "30px", height: "auto" }} />
      </div>

      <svg style={waveOverlayStyle} viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFFFFF" d="M0,400 C180,350 360,250 540,250 C720,250 900,350 1080,350 C1260,350 1440,250 1440,250 L1440,500 L0,500 Z" />
      </svg>
    </div>
  );
};

const TechIconsSection = () => {
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
  return (
    <div style={{ width: "100%", backgroundColor: "#F5FEFC", minHeight: "50vh", padding: "60px 20px", display: "flex", justifyContent: "center", alignItems: "center", overflowX: "hidden", fontFamily: "'Onest', sans-serif" }}>
      <div style={cardsContainerStyle}>
        <div style={{ ...cardStyle, backgroundColor: "#E8F3FF" }}>
          <div style={imageContainerStyle}>
            <img src={Card1Image} alt="Card1 Image" style={imageStyle} />
          </div>
          <div style={cardContentContainerStyle}>
            <h2 style={cardTitleStyle}>Autopilot</h2>
            <p style={cardTextStyle}>
              Empower our AI engine to manage the purchase and sale of reserved instances, effectively optimizing your AWS expenditure.
            </p>
            <a href="#" style={cardLinkStyle}>Learn more →</a>
          </div>
        </div>

        <div style={{ ...cardStyle, backgroundColor: "#EAFBF2" }}>
          <div style={imageContainerStyle}>
            <img src={Card2Image} alt="Fine Analysis" style={imageStyle} />
          </div>
          <div style={cardContentContainerStyle}>
            <h2 style={cardTitleStyle}>Cost Explorer</h2>
            <p style={cardTextStyle}>
              Gain actionable insights through thorough analysis of your usage behaviors, uncovering fresh savings possibilities.
            </p>
            <a href="#" style={cardLinkStyle}>Learn more →</a>
          </div>
        </div>

        <div style={{ ...cardStyle, backgroundColor: "#F7F7F7" }}>
          <div style={imageContainerStyle}>
            <img src={Card3Image} alt="Litter Trends" style={imageStyle} />
          </div>
          <div style={cardContentContainerStyle}>
            <h2 style={cardTitleStyle}>Quantum Secure</h2>
            <p style={cardTextStyle}>
              Ensure your data remains protected with our advanced quantum-resistant encryption methods without entanglements.
            </p>
            <a href="#" style={cardLinkStyle}>Learn more →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetectLitterSection = () => {
  return (
    <div style={detectLitterSectionStyle}>
      <div style={detectLitterContainerStyle}>
        <div style={detectLitterImageContainerStyle}>
          <img src={LitterFromCar} alt="Car with litter detection" style={detectLitterImageStyle} />
          <img src={LitterFromCar2} alt="Highway litter detection" style={detectLitterImageStyle} />
        </div>

        <div style={detectLitterTextContainerStyle}>
          <h2 style={detectLitterTitleStyle}>
            Identify and Fine <span style={detectLitterHighlightStyle}>Offenders in Real-Time</span>
          </h2>
          <p style={detectLitterDescriptionStyle}>
            AI-driven systems detect littering instantly, using surveillance, facial recognition, and license plate reading to issue fines on the spot promoting cleaner public spaces.
          </p>
          <p style={detectLitterDescriptionStyle}>
            Our technology enables authorities to enforce anti-littering laws effectively and efficiently. The automated system reduces the need for manual monitoring and increases the rate of detection.
          </p>
          <a href="#" style={detectLitterButtonStyle}>Learn More →</a>
        </div>
      </div>
    </div>
  );
};

const FacialRecognitionSection = () => {
  return (
    <div style={facialRecognitionSectionStyle}>
      <div style={facialRecognitionContainerStyle}>
        <div style={facialRecognitionTextContainerStyle}>
          <h2 style={facialRecognitionTitleStyle}>
            Accurately document littering incidents with <span style={facialRecognitionHighlightStyle}>Facial & Number Plate Recognition</span>
          </h2>
          <p style={facialRecognitionDescriptionStyle}>
            Easily capture and document littering incidents using advanced facial and number plate recognition technology. This ensures accurate identification of violators in real-time. With high precision, authorities can act quickly and efficiently to address issues promoting a cleaner, more responsible community.
          </p>
          <a href="#" style={facialRecognitionButtonStyle}>Learn More →</a>
        </div>

        <div style={facialRecognitionImageContainerStyle}>
          <img src={FacialRecognitionImage} alt="Facial Recognition ID Matching" style={{ width: "100%", maxWidth: "450px", borderRadius: "15px", backgroundColor: "#EBE6FE", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }} />
        </div>
      </div>
    </div>
  );
};

const LitterTrendsSection = () => {
  return (
    <div style={litterTrendsSectionStyle}>
      <div style={litterTrendsContainerStyle}>
        <div style={litterTrendsCardStyle}>
          <h1 style={litterTrendsHeadingStyle}>Islamabad</h1>
          <div style={litterTrendsImagesContainerStyle}>
            <div style={litterTrendsImageContainerStyle}>
              <img src={ScaleUpGraph} alt="Littering trends visualization" style={litterTrendsImageStyle} />
            </div>
            <div style={litterTrendsImageContainerStyle}>
              <img src={ScaleDownGraph} alt="Real-time monitoring" style={litterTrendsImageStyle} />
            </div>
          </div>
        </div>

        <div style={litterTrendsContentContainerStyle}>
          <h2 style={litterTrendsTitleStyle}>
            Track citywide littering trends <span style={{ color: "#4566EA" }}>In Real-Time</span>
          </h2>
          <p style={litterTrendsTextStyle}>
            Visualize litter hotspots and monitor violation rates with detailed insights to optimize citywide cleanup efforts.
          </p>
          <a href="#" style={litterTrendsButtonStyle}>Learn More →</a>
        </div>
      </div>
    </div>
  );
};

const MapSection = () => {
  return (
    <div style={mapSectionStyle}>
      <div style={mapContainerStyle}>
        <div style={mapContentContainerStyle}>
          <div style={mapTitleContainerStyle}>
            <h2 style={mapTitleStyle}>
              Track Littering Activity with <span style={mapHighlightStyle}>Detection &<br />Reporting Tools</span>
            </h2>
          </div>
          <p style={mapTextStyle}>
            Monitor littering in real-time and identify high-violation areas. Use this data to streamline cleanup efforts and enhance enforcement, ensuring cleaner and safer public spaces.
          </p>
          <a href="#" style={mapButtonStyle}>Learn More →</a>
        </div>

        <div style={mapCardStyle}>
          <img src={HeatMap} alt="Litter Map Heatmap View" style={mapImageStyle} />
        </div>
      </div>
    </div>
  );
};

const HeroBanner = () => {
  return (
    <div style={heroBannerStyle}>
      <h1 style={heroTitleStyle}>Be the Change the World Needs!</h1>
      <p style={heroParagraphStyle}>Join TrashCams mission and keep our communities clean.</p>
      <div style={heroInputContainerStyle}>
        <input type="email" placeholder="Enter your email" style={heroInputStyle} />
        <button style={heroButtonStyle}>Get started</button>
      </div>
      <p style={heroDisclaimerStyle}>By clicking Sign Up you're confirming that you agree with our Terms and Conditions.</p>
    </div>
  );
};

const NavigationBar = () => {
  return (
    <nav style={navStyle}>
      <a href="/">
        <img src="/logo_white.svg" alt="TrashCam Logo" style={logoStyle} />
      </a>
      <div style={navLinksContainerStyle}>
        <div style={navLinksStyle}>
          <a href="#features" style={navLinkStyle}>Feature Blog</a>
          <a href="#about" style={navLinkStyle}>About Us</a>
          <a href="#blog" style={navLinkStyle}>Blog</a>
          <a href="#contact" style={navLinkStyle}>Contact Us</a>
        </div>
      </div>
      <a href="#get-started" style={navButtonStyle}>Get started</a>
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
      font-family: 'Onest', sans-serif;
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