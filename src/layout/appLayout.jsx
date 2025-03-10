import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainSidebar from "./sidebar/sidebar";
import Dashboard from "../pages/dashboard/dashboard";
import Reports from "../pages/listReports/listReports";
import ReportDetails from "../pages/reportDetails";

const AppLayout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="app-container">
      {!hideSidebar && <div className="sidebar"><MainSidebar /></div>}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/report-details/:id" element={<ReportDetails />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
