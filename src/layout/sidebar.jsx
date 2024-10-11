// frontend/src/components/sidebar/MainSidebar.jsx
import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaList, FaSearch } from 'react-icons/fa';
import { RiHome2Line } from 'react-icons/ri';
import { TbReport } from 'react-icons/tb';
import { PiMoneyWavy } from 'react-icons/pi';
import { LuHelpCircle } from 'react-icons/lu';
import '../css/sidebar.css';

const MainSidebar = ({ activePage, setActivePage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Sidebar className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="TrashCam Logo" />
      </div>
      <div className="sidebar-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
      <Menu className="sidebar-nav">
        <MenuItem
          icon={<RiHome2Line />}
          onClick={() => setActivePage('dashboard')}
          active={activePage === 'dashboard'}
        >
          Home
        </MenuItem>
        <MenuItem
          icon={<FaList />}
          onClick={() => setActivePage('cities')}
          active={activePage === 'cities'}
        >
          Cities
        </MenuItem>
        <MenuItem
          icon={<TbReport />}
          onClick={() => setActivePage('reports')}
          active={activePage === 'reports'}
          suffix={<span className="menu-badge">2</span>}
        >
          Reports
        </MenuItem>
        <MenuItem
          icon={<PiMoneyWavy />}
          onClick={() => setActivePage('fines')}
          active={activePage === 'fines'}
        >
          Fines
        </MenuItem>
        <MenuItem
          icon={<LuHelpCircle />}
          onClick={() => setActivePage('help')}
          active={activePage === 'help'}
        >
          Help & Support
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default MainSidebar;
