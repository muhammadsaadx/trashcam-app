import React, { useState } from 'react';
import MainSidebar from './sidebar';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login'; // Make sure this import path matches your file structure
import Reports from '../pages/reports'; 
import ReportDetails from '../pages/reportDetails'; // Capitalized 'ReportDetails'

const MainLayout = () => {
  const [activePage, setActivePage] = useState('login'); 
  const [selectedCNIC, setSelectedCNIC] = useState(''); 

  const renderContent = () => {
    switch (activePage) {
      case 'login':
        return <Login setActivePage={setActivePage} />; 
      case 'dashboard':
        return <Dashboard />;
      case 'reports':
        return <Reports setActivePage={setActivePage} setSelectedCNIC={setSelectedCNIC}/>;
      case 'reportDetails':
        return <ReportDetails />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      {activePage !== 'login' && (
        <div className="sidebar">
          <MainSidebar activePage={activePage} setActivePage={setActivePage} />
        </div>
      )}

      <div className={`main-content ${activePage === 'login' ? 'full-width' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default MainLayout;
