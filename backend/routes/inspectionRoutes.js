// backend/routes/inspectionRoutes.js
const express = require('express');
const router = express.Router();
const inspectionController = require('../controllers/inspectionController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new inspection, get inspections, log an issue, and list issues for a given inspection
router.post('/', authMiddleware, inspectionController.createInspection);
router.get('/', authMiddleware, inspectionController.getInspections);
router.post('/issue', authMiddleware, inspectionController.logIssue);
router.get('/:inspectionId/issues', authMiddleware, inspectionController.getIssuesForInspection);

module.exports = router;
