// frontend/src/services/authService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';


const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

const authService = { register, login };

export default authService;
