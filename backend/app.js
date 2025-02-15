// backend/app.js
const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errorMiddleware');

// Import route files
const authRoutes = require('./routes/authRoutes');
const inspectionRoutes = require('./routes/inspectionRoutes');
const reportRoutes = require('./routes/reportRoutes');

const cors = require('cors');


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/inspections', inspectionRoutes);
app.use('/api/reports', reportRoutes);



module.exports = app;
