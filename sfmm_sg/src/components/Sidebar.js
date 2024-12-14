import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding, faChartLine, faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <div className="logo">S.F.M</div>
      <ul>
        <li className={activeItem === 'Home' ? 'active' : ''} onClick={() => handleItemClick('Home')}>
          <Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> Home</Link>
        </li>
        <li className={activeItem === 'Companies' ? 'active' : ''} onClick={() => handleItemClick('Companies')}>
          <Link to="/companies"><FontAwesomeIcon icon={faBuilding} /> Companies</Link>
        </li>
        
        <li className={activeItem === 'Metrics' ? 'active' : ''} onClick={() => handleItemClick('Metrics')}>
          <Link to="/metrics"><FontAwesomeIcon icon={faChartLine} /> Metrics</Link>
        </li>
        <li className={activeItem === 'CompanyEsgData' ? 'active' : ''} onClick={() => handleItemClick('CompanyEsgData')}>
          <Link to="/CompanyEsgData"><FontAwesomeIcon icon={faChartLine} /> CompanyEsgData</Link>
        </li>
        <li className={activeItem === 'Reports' ? 'active' : ''} onClick={() => handleItemClick('Reports')}>
          <Link to="/reports"><FontAwesomeIcon icon={faFileAlt} /> Reports</Link>
        </li>
        <li className={activeItem === 'Users' ? 'active' : ''} onClick={() => handleItemClick('Users')}>
          <Link to="/users"><FontAwesomeIcon icon={faUsers} /> Users</Link>
        </li>
        <li className={activeItem === 'Roles' ? 'active' : ''} onClick={() => handleItemClick('Roles')}>
          <Link to="/Roles"><FontAwesomeIcon icon={faUsers} /> Roles</Link>
        </li>
        <li className={activeItem === 'Permissiontable' ? 'active' : ''} onClick={() => handleItemClick('Permissiontable')}>
          <Link to="/Permissiontable"><FontAwesomeIcon icon={faUsers} /> Permissions</Link>
        </li>
        <li className={activeItem === 'FileUpload' ? 'active' : ''} onClick={() => handleItemClick('FileUpload')}>
          <Link to="/FileUpload"><FontAwesomeIcon icon={faUsers} /> Upload Metrics</Link>
        </li>
        <li className={activeItem === 'Projectboundary' ? 'active' : ''} onClick={() => handleItemClick('Projectboundary')}>
          <Link to="/ProjectBoundary"><FontAwesomeIcon icon={faUsers} /> Project Boundary</Link>
        </li>  
      </ul>
      <div className="footer"></div>
    </div>
  );
};

export default Sidebar;