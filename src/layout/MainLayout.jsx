import React from 'react';
import MainSidebar from './sidebar'; // Adjust the path if needed
import Dashboard from '../pages/dashboard'; // Adjust as needed for other pages
import '../css/mainLayout.css'; // Import your CSS file for layout styles

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="sidebar">
        <MainSidebar />
      </div>
      <div className="dashboard">
        <Dashboard />
      </div>
    </div>
  );
};

export default MainLayout;
