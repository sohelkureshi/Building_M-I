// frontend/src/services/inspectionService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/inspections';

const getToken = () => localStorage.getItem('token');

const getInspections = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

const getInspectionById = async (inspectionId) => {
  const response = await axios.get(`${API_URL}/${inspectionId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

const createInspection = async (inspectionData) => {
  const response = await axios.post(API_URL, inspectionData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

const getIssuesForInspection = async (inspectionId) => {
  const response = await axios.get(`${API_URL}/${inspectionId}/issues`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

const inspectionService = {
  getInspections,
  getInspectionById,
  createInspection,
  getIssuesForInspection,
};

export default inspectionService;
