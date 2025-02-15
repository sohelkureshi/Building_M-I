// frontend/src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Common/Header';
import Sidebar from '../components/Common/Sidebar';
import InspectionList from '../components/Dashboard/InspectionList';
import Footer from '../components/Common/Footer';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Header />
      <div className="dashboard-content" style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          <h2>Dashboard</h2>
          <InspectionList />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
