// frontend/src/components/Inspection/InspectionForm.js
import React, { useState } from 'react';
import inspectionService from '../../services/inspectionService';
import { useNavigate } from 'react-router-dom';
import '../../styles/InspectionForm.css';

const InspectionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    facilityId: '',
    scheduledDate: '',
    notes: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await inspectionService.createInspection(formData);
      navigate(`/inspections/${data._id}`);
    } catch (err) {
      console.error('Inspection creation error:', err);
      setError(err.response ? err.response.data.message : 'Error creating inspection');
    }
  };

  return (
    <div className="inspection-form">
      <h2>Create Inspection</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Facility ID:</label>
          <input
            type="text"
            name="facilityId"
            value={formData.facilityId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Scheduled Date:</label>
          <input
            type="datetime-local"
            name="scheduledDate"
            value={formData.scheduledDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>
        <button type="submit">Create Inspection</button>
      </form>
    </div>
  );
};

export default InspectionForm;
