import React from 'react';
import Sidebar from './Sidebar'; // Ensure the path is correct
import './Layout.css'; // Create this file for styling the layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
