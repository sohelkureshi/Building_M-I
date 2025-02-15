// Path: src/components/Inspection/InspectionDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import inspectionService from '../../services/inspectionService';
import IssueList from '../Dashboard/IssueList';
import '../../styles/InspectionDetail.css';

const InspectionDetail = () => {
  const { inspectionId } = useParams();
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueError, setIssueError] = useState('');
  const [issueSuccess, setIssueSuccess] = useState('');
  const [issueImage, setIssueImage] = useState(null);

  const fetchInspection = async () => {
    try {
      const data = await inspectionService.getInspectionById(inspectionId);
      console.log('Fetched inspection:', data);
      setInspection(data);
    } catch (error) {
      console.error('Error fetching inspection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setIssueImage(e.target.files[0]);
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    setIssueError('');
    setIssueSuccess('');
    try {
      const formData = new FormData();
      formData.append('inspectionId', inspectionId);
      formData.append('description', issueDescription);
      if (issueImage) {
        formData.append('image', issueImage);
      }

      await inspectionService.logIssue(formData);
      setIssueSuccess('Issue logged successfully.');
      setIssueDescription('');
      setIssueImage(null);
      // Optionally refresh the list of issues here
    } catch (error) {
      console.error('Error logging issue:', error);
      setIssueError('Failed to log issue.');
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

      {/* Issue Logging Form */}
      <div className="issue-form">
        <h3>Log a New Issue</h3>
        {issueError && <p className="error">{issueError}</p>}
        {issueSuccess && <p className="success">{issueSuccess}</p>}
        <form onSubmit={handleIssueSubmit}>
          <div>
            <label>Description:</label>
            <textarea
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Submit Issue</button>
        </form>
      </div>
    </div>
  );
};

export default InspectionDetail;
