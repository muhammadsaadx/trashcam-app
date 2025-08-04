import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { FaList, FaSearch } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { TfiHelpAlt } from "react-icons/tfi";
import { MdOutlineCameraAlt } from "react-icons/md"; // Added camera icon
import styles from "./sidebar.styles"; // Import styles.js

const MainSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  return (
    <Sidebar style={styles.sidebar}>
      <div style={styles.sidebarContent}>

        {/*     LOGO    */}
        <img src="/logo.svg" alt="TrashCam Logo" style={styles.sidebarLogo} />

        {/*     SEARCH BAR    */}
        <div style={styles.sidebarSearch}>
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/*     MENU    */}
        <Menu>
          <MenuItem icon={<RiHome2Line />} onClick={() => navigate("/dashboard")}>
            Home
          </MenuItem>
          <MenuItem icon={<TbReport />} onClick={() => navigate("/reports")} suffix={<span style={styles.menuBadge}>2</span>}>
            Fines
          </MenuItem>

          <MenuItem 
            icon={<MdOutlineCameraAlt />} // Added camera icon here
            onClick={() => navigate("/detect")}
          >
            Detect
          </MenuItem>


          <MenuItem icon={<FaList />} onClick={() => navigate("/cities")}>
            Cities
          </MenuItem>
          <MenuItem icon={<TfiHelpAlt />} onClick={() => navigate("/help")}>
            Help & Support
          </MenuItem>
        </Menu>
      </div>
      <div style={styles.greenStrip}></div>
    </Sidebar>
  );
};

export default MainSidebar;
