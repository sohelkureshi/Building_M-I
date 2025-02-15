// frontend/src/components/Dashboard/IssueList.js
import React, { useEffect, useState } from 'react';
import inspectionService from '../../services/inspectionService';
import '../../styles/IssueList.css';


const IssueList = ({ inspectionId }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const data = await inspectionService.getIssuesForInspection(inspectionId);
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [inspectionId]);

  if (loading) return <p>Loading issues...</p>;

  return (
    <div className="issue-list">
      <h3>Issues</h3>
      {issues.length === 0 ? (
        <p>No issues reported.</p>
      ) : (
        <ul>
          {issues.map((issue) => (
            <li key={issue._id}>
              <p>{issue.description}</p>
              {issue.imageUrl && (
                <img src={issue.imageUrl} alt="Issue" style={{ width: '100px' }} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IssueList;
