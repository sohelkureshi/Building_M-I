// frontend/src/services/reportService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/reports';

const getToken = () => localStorage.getItem('token');

const generateReport = async (inspectionId) => {
  const response = await axios.get(`${API_URL}/${inspectionId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
    responseType: 'blob', // for PDF binary data
  });
  return response.data;
};

const reportService = { generateReport };

export default reportService;
