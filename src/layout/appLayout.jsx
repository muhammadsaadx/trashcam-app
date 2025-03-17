import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import MainSidebar from "./sidebar/sidebar";
import Dashboard from "../pages/dashboard/dashboard";
import Reports from "../pages/listReports/listReports";
import ReportDetails from "../pages/reportDetails/reportDetails";
import OffenderProfile from "../pages/offenderProfile/offenderProfile";
import Detect from "../pages/detect/detect";
import Landing from "../pages/landing/landing"



const AppLayout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="app-container">
      <div className="main-content">
        <Routes>
          {/* all unassigned ones */}
          <Route path="*" element={<Navigate to="/dashboard" />} />   

        

          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reportDetails/:reportid" element={<ReportDetails />} />
          <Route path="/offenderProfile/:offenderid" element={<OffenderProfile/>} />
          <Route path="/detect" element={<Detect/>} />
        
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
