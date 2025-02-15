import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

const Register = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'inspector',
  });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login'); // Replace history.push with navigate
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="inspector">Inspector</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
