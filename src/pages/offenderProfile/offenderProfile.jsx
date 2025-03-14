import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./offenderProfile.styles"; // Ensure this is a valid styles object
import axios from "axios";
import config from "../../config/config";


const OffenderProfile = () => {
  const [offenderData, setOffenderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { offenderid } = useParams();

  useEffect(() => {
        fetchOffenderData();
      }, [offenderid]); // Run the effect only when `offenderid` changes
      



  
  const fetchOffenderData = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/offenders/get_offender_profile`, {
                params: { offender_id: offenderid },
            });
            setOffenderData(response.data.offender);
        } catch (error) {
            console.error("Error fetching offender data:", error);
        }
    };
    
        

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>Offender Profile</h1>
        <div style={styles.offenderid}>Offender ID: {offenderid || "N/A"}</div>
      </div>

      {offenderData ? (


        <div style={styles.row}>
          Offender Profile
        </div>


      ) : (


















        <div style={styles.loadingContainer}>
          <CircularProgress size={60} style={styles.spinner} />
          <p style={styles.loadingText}>Loading offender profile...</p>
        </div>
      )}
    </div>
  );
};

export default OffenderProfile;
