import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaList, FaSearch } from 'react-icons/fa'; // Import the search icon
import { RiHome2Line } from 'react-icons/ri';
import { TbReport } from 'react-icons/tb';
import { PiMoneyWavy } from 'react-icons/pi';
import { LuHelpCircle } from 'react-icons/lu';
import '../css/sidebar.css';

const MainSidebar = () => {
  return (
    <Sidebar className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="TrashCam Logo" /> {/* Direct path to logo in public */}
      </div>

      <div className="sidebar-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      <Menu className="sidebar-nav">
        <MenuItem icon={<RiHome2Line />} suffix={<span className="menu-badge">10</span>}>Home</MenuItem>
        <MenuItem icon={<FaList />}>Cities</MenuItem>
        <MenuItem icon={<TbReport />} suffix={<span className="menu-badge">2</span>}>Reports</MenuItem>
        <MenuItem icon={<PiMoneyWavy />}>Fines</MenuItem>
        <MenuItem icon={<LuHelpCircle />}>Help & Support</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MainSidebar;
