// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

// Generate a PDF report for a specific inspection
router.get('/:inspectionId', authMiddleware, reportController.generateReport);

module.exports = router;
