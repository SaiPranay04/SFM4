import React from 'react';
import './MainContent.css';

const MainContent = ({ isSidebarVisible }) => {
  return (
    <div className={`main-content ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
      {/* Your main content here */}
    </div>
  );
};

export default MainContent;