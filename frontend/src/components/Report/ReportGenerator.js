// frontend/src/components/Report/ReportGenerator.js
import React, { useState } from 'react';
import reportService from '../../services/reportService';
import '../../styles/ReportGenerator.css';

const ReportGenerator = ({ inspectionId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const response = await reportService.generateReport(inspectionId);
      // Convert blob to a downloadable URL
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inspection-report-${inspectionId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Error generating report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-generator">
      <button onClick={handleGenerateReport} disabled={loading}>
        {loading ? 'Generating Report...' : 'Generate Report'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ReportGenerator;
