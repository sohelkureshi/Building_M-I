// frontend/src/components/Dashboard/InspectionList.js
import React, { useEffect, useState } from 'react';
import inspectionService from '../../services/inspectionService';
import { Link } from 'react-router-dom';
import '../../styles/InspectionList.css';

const InspectionList = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInspections = async () => {
    try {
      const data = await inspectionService.getInspections();
      setInspections(data);
    } catch (error) {
      console.error('Error fetching inspections:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  if (loading) return <p>Loading inspections...</p>;

  return (
    <div className="inspection-list">
      <h2>Inspections</h2>
      {inspections.length === 0 ? (
        <p>No inspections available.</p>
      ) : (
        <ul>
          {inspections.map((insp) => (
            <li key={insp._id}>
              <Link to={`/inspections/${insp._id}`}>
                Facility: {insp.facilityId} | Date: {new Date(insp.scheduledDate).toLocaleString()}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InspectionList;
