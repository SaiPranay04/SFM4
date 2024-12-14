import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'; // Ensure these imports are present
import Navbar from './components/Navbar';
import Home from './components/Home';

import About from './components/About';
import Contact from './components/Contact';
import Loginsignup from './components/Loginsignup';
import Footprint from './components/Footprint';
import Result from './components/Result';
import Dashboard from './components/Dashboard';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Companies from './components/Companies';
import Metrics from './components/Metrics';
import Reports from './components/Reports';
import User from './components/User';
import Layout from './components/Layout';
import CompanyDetails  from './components/CompanyDetails';
import AddEditCompany from './components/AddEditCompany';
import AddEditESGMetric from './components/AddEditESGMetric';
import CompanyEsgData from './components/CompanyEsgData';
import Roles from './components/Roles';
import Permissiontable from './components/Permissiontable';
import SignUp from './components/SignUp';
import FileUpload from './components/FileUpload';
import Projectboundary from './components/Projectboundary';



const AppContent = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/dashboard']; // Add more routes if you don't want navbar on them
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="app">
      {location.pathname === '/dashboard' && (
        <Sidebar isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} />
      )}
      <main className="content">
        {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
        {location.pathname === '/dashboard' && <Topbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loginsignup" element={<Loginsignup />} />
          <Route path="/footprint" element={<Footprint />} />
          <Route path="/form" element={<Footprint />} />
          <Route path="/result" element={<Result />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/companies" element={<Layout><Companies /></Layout>} />
          <Route path="/metrics" element={<Layout><Metrics /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/users" element={<Layout><User /></Layout>} />
          <Route path="/companydetails/:companyID" element={<Layout><CompanyDetails /></Layout>} />
          <Route path="/addeditcompany" element={<Layout><AddEditCompany /></Layout>} />
          <Route path="/AddEditESGMetric" element={<Layout><AddEditESGMetric /></Layout>} />
          <Route path="/CompanyEsgData" element={<Layout><CompanyEsgData /></Layout>} />
          <Route path="/Roles" element={<Layout><Roles /></Layout>} />
          <Route path="/Permissiontable" element={<Layout><Permissiontable /></Layout>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/FileUpload" element={<Layout><FileUpload /></Layout>} />
          <Route path="/Projectboundary" element={<Layout><Projectboundary /></Layout>} />       
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

export default App;