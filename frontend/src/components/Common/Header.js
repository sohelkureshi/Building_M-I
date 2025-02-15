import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Header.css';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Replace history.push with navigate
  };

  return (
    <header>
      <h1>Building Maintenance & Inspection</h1>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
