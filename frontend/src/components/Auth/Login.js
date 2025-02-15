import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // Replace history.push with navigate
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
