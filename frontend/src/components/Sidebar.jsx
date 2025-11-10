import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSearch, FaMusic, FaCompactDisc, FaUserFriends, FaBroadcastTower, FaHeart, FaHistory, FaFolderOpen } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar glass">
    <div className="sidebar-brand">Music<span>App</span></div>
    <nav>
      <ul>
        <li><NavLink to="/home"><FaHome /><span>Browse</span></NavLink></li>
        <li><NavLink to="/search"><FaSearch /><span>Search</span></NavLink></li>
        <li><NavLink to="/home"><FaMusic /><span>Songs</span></NavLink></li>
        <li><NavLink to="/home"><FaCompactDisc /><span>Albums</span></NavLink></li>
        <li><NavLink to="/home"><FaUserFriends /><span>Artists</span></NavLink></li>
        <li><NavLink to="/home"><FaBroadcastTower /><span>Radio</span></NavLink></li>
      </ul>
      <div className="sidebar-section">My music</div>
      <ul>
        <li><NavLink to="/home"><FaHistory /><span>Recent</span></NavLink></li>
        <li><NavLink to="/home"><FaHeart /><span>Favorites</span></NavLink></li>
        <li><NavLink to="/home"><FaFolderOpen /><span>Local</span></NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
