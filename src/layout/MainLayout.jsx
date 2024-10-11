// frontend/src/layout/MainLayout.jsx
import React, { useState } from 'react';
import MainSidebar from './sidebar';
import Dashboard from '../pages/dashboard';

const MainLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      <div className="sidebar">
        <MainSidebar activePage={activePage} setActivePage={setActivePage} />
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainLayout;
