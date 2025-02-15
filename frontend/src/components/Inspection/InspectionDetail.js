// frontend/src/components/Inspection/InspectionDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import inspectionService from '../../services/inspectionService';
import IssueList from '../Dashboard/IssueList';
import '../../styles/InspectionDetail.css';

const InspectionDetail = () => {
  const { inspectionId } = useParams();
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInspection = async () => {
    try {
      const data = await inspectionService.getInspectionById(inspectionId);
      setInspection(data);
    } catch (error) {
      console.error('Error fetching inspection:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspection();
  }, [inspectionId]);

  if (loading) return <p>Loading inspection...</p>;
  if (!inspection) return <p>Inspection not found.</p>;

  return (
    <div className="inspection-detail">
      <h2>Inspection Details</h2>
      <p>
        <strong>Facility ID:</strong> {inspection.facilityId}
      </p>
      <p>
        <strong>Scheduled Date:</strong>{' '}
        {new Date(inspection.scheduledDate).toLocaleString()}
      </p>
      <p>
        <strong>Inspector:</strong> {inspection.inspector}
      </p>
      <p>
        <strong>Notes:</strong> {inspection.notes}
      </p>

      <IssueList inspectionId={inspectionId} />
    </div>
  );
};

export default InspectionDetail;
