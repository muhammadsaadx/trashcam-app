import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styles from "./offenderProfile.styles"; // Ensure this is a valid styles object

const OffenderProfile = () => {
  const [offenderData, setOffenderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { offenderid } = useParams();

  useEffect(() => {
    if (!offenderid) return;

    const fetchOffenderData = async () => {
      try {
        setLoading(true);
        // Simulating API call delay
        setTimeout(() => {
          setOffenderData({ id: offenderid, details: "Offender details go here." });
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching offender data:", error);
        setLoading(false);
      }
    };

    fetchOffenderData();
  }, [offenderid]);

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.title}>Offender Profile</h1>
        <div style={styles.offenderid}>Offender ID: {offenderData?.id || "N/A"}</div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <CircularProgress size={60} style={styles.spinner} />
          <p style={styles.loadingText}>Loading offender profile...</p>
        </div>
      ) : (
        <div style={styles.row}>
          <h2>Offender Profile</h2>
          <p>{offenderData.details}</p>
        </div>
      )}
    </div>
  );
};

export default OffenderProfile;
