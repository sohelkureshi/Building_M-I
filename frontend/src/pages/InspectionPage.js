// frontend/src/pages/InspectionPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Common/Header';
import InspectionDetail from '../components/Inspection/InspectionDetail';
import ReportGenerator from '../components/Report/ReportGenerator';
import Footer from '../components/Common/Footer';
import '../styles/InspectionPage.css';

const InspectionPage = () => {
  const { inspectionId } = useParams();

  return (
    <div className="inspection-page">
      <Header />
      <main style={{ padding: '20px' }}>
        <InspectionDetail />
        <ReportGenerator inspectionId={inspectionId} />
      </main>
      <Footer />
    </div>
  );
};

export default InspectionPage;
