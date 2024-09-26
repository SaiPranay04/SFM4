import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Card from './Card';
import ESGChart from './ESGChart';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Change body background color when the Dashboard component mounts
  useEffect(() => {
    document.body.classList.add('dashboard');
    
    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('dashboard');
    };
  }, []);

  const handleAddCompanyClick = () => {
    navigate('/AddEditCompany');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <h1 className="h1dashboard">Dashboard</h1>
            <p>Good Morning user!!!</p>
          </div>
          <div className="header-right">
            {/* Icons if needed */}
          </div>
        </div>
        <div className="cards">
          <Card className="total" title="Total Companies:" value="1000" />
          <Card className="recent-esg" title="Recent ESG Score">
            <ESGChart />
          </Card>
        </div>
        <div className="quick-links">
          <label className="quick-link-label">Quick Link:</label>
          <button className="btn add-company-btn" onClick={handleAddCompanyClick}>Add New Company</button>
          <button className="btn view-reports-btn">View Reports</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;