// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import InspectionProvider from './context/InspectionContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <InspectionProvider>
        <App />
      </InspectionProvider>
    </AuthProvider>
  </React.StrictMode>
);
