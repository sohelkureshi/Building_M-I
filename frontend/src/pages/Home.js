// frontend/src/pages/Home.js
import React from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main>
        <h2>Welcome to the Building Maintenance & Inspection System</h2>
        <p>
          Your platform for managing inspections and maintenance efficiently.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
