import React, { useState } from 'react';
import MainSidebar from './sidebar';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login'; // Make sure this import path matches your file structure
import Fines from '../pages/fines'; // Import the Fines component

const MainLayout = () => {
  const [activePage, setActivePage] = useState('login'); // Initially set to 'login' page

  const renderContent = () => {
    switch (activePage) {
      case 'login':
        return <Login setActivePage={setActivePage} />; // Pass setActivePage as a prop
      case 'dashboard':
        return <Dashboard />;
      case 'fines':
        return <Fines />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      {/* Only show the sidebar when the user is logged in (not on the login page) */}
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
