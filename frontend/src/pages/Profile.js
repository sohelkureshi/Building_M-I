// frontend/src/pages/Profile.js
import React, { useContext } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { AuthContext } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <Header />
      <main style={{ padding: '20px' }}>
        <h2>Profile</h2>
        {user ? (
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
