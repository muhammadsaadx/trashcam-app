import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../layout/sidebar/sidebar.jsx';
import axios from 'axios';
import config from '../../config/config.js';

function Detect() {
  const [webcamActive, setWebcamActive] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [webcamError, setWebcamError] = useState('');
  const videoRef = useRef(null);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  const toggleWebcam = async () => {
    if (webcamActive) {
      // Stop the webcam
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      setWebcamActive(false);
      setWebcamError('');
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        setWebcamActive(true);
        setWebcamError('');
      } catch (error) {
        console.error('Error accessing webcam:', error);
        setWebcamError('Could not access webcam. Please check permissions.');
        setWebcamActive(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        width: '100%'
      }}>
        <h2>Webcam Detection</h2>

        <button 
          onClick={toggleWebcam}
          style={{
            padding: '12px 24px',
            backgroundColor: webcamActive ? '#ff4444' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '20px 0'
          }}
        >
          {webcamActive ? 'Stop Webcam' : 'Start Webcam'}
        </button>

        {webcamError && (
          <p style={{ color: 'red', margin: '10px 0' }}>{webcamError}</p>
        )}

        {webcamActive && (
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: '640px',
              height: '480px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#666' }}>
            {webcamActive 
              ? 'Webcam is active. Click stop to end session.'
              : 'Click the button above to start webcam detection'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detect;