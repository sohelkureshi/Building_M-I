import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import InspectionPage from './pages/InspectionPage';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import InspectionForm from './components/Inspection/InspectionForm';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inspections/new" element={<InspectionForm />} />
        <Route path="/inspections/:inspectionId" element={<InspectionPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
