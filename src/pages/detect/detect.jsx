import React, { useState } from 'react';
import Sidebar from '../../layout/sidebar/sidebar.jsx';
import axios from 'axios';
import config from '../../config/config.js'; // Ensure this file exists with API_BASE_URL

function Detect() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a video file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('video', selectedFile);

      // Adjusted endpoint to match FastAPI's `/detect/` instead of `/detect/detect`
      const response = await axios.post(
        `${config.API_BASE_URL}/detect/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Upload successful:', response.data);
      setUploadStatus('Upload completed successfully!');
      setSelectedFile(null); // Clear file input after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(`Upload failed: ${error.response?.data?.detail || error.message}`);
    } finally {
      setIsUploading(false);
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
        <h2>Video Detection</h2>

        <input 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
          disabled={isUploading}
        />

        {selectedFile && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Selected file: {selectedFile.name}</p>
            <button 
              onClick={handleUpload} 
              disabled={isUploading}
              style={{
                padding: '8px 16px',
                backgroundColor: isUploading ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isUploading ? 'not-allowed' : 'pointer'
              }}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}

        {uploadStatus && (
          <p style={{ 
            marginTop: '20px',
            color: uploadStatus.includes('failed') ? 'red' : 'green'
          }}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default Detect;
