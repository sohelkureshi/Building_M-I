// backend/routes/inspectionRoutes.js
const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new inspection
router.post('/', authMiddleware, inspectionController.createInspection);

// Get all inspections
router.get('/', authMiddleware, inspectionController.getInspections);

// Get a single inspection by ID
router.get('/:inspectionId', authMiddleware, inspectionController.getInspectionById);

// Log an issue for a specific inspection
router.post('/issue', authMiddleware, inspectionController.logIssue);

// Get all issues for a given inspection
router.get('/:inspectionId/issues', authMiddleware, inspectionController.getIssuesForInspection);

module.exports = router;
