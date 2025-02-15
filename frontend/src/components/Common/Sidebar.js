// frontend/src/components/Common/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard Home</Link>
        </li>
        <li>
          <Link to="/inspections/new">Create Inspection</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
