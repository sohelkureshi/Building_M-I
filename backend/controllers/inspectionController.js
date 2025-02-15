// backend/controllers/inspectionController.js
const mongoose = require('mongoose');
const Inspection = require('../models/Inspection');
const Issue = require('../models/Issue');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.createInspection = async (req, res, next) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Decoded user from token:", req.user);

    const { facilityId, scheduledDate, notes } = req.body;

    // Get inspector from the token payload
    const inspector = req.user && req.user.userId;
    if (!inspector) {
      return res.status(400).json({ message: 'Inspector not found in token' });
    }

    // Convert scheduledDate to a Date object
    const scheduledDateObj = new Date(scheduledDate);
    if (isNaN(scheduledDateObj.getTime())) {
      return res.status(400).json({ message: 'Invalid scheduled date' });
    }

    // Convert the inspector string to a valid ObjectId using 'new'
    let inspectorId;
    try {
      inspectorId = new mongoose.Types.ObjectId(inspector);
    } catch (e) {
      console.error("Inspector ID conversion error:", e);
      return res.status(400).json({ message: 'Invalid inspector ID format' });
    }

    // Create new inspection using validated data
    const newInspection = new Inspection({
      facilityId,
      scheduledDate: scheduledDateObj,
      inspector: inspectorId,
      notes,
    });

    await newInspection.save();
    res.status(201).json(newInspection);
  } catch (error) {
    console.error("Error in createInspection:", error);
    next(error);
  }
};

exports.getInspections = async (req, res, next) => {
  try {
    const inspections = await Inspection.find().sort({ scheduledDate: -1 });
    res.json(inspections);
  } catch (error) {
    next(error);
  }
};

exports.getInspectionById = async (req, res, next) => {
  try {
    const { inspectionId } = req.params;
    console.log("Fetching inspection with ID:", inspectionId);
    const inspection = await Inspection.findById(inspectionId);
    console.log("Found inspection:", inspection);
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }
    res.json(inspection);
  } catch (error) {
    console.error("Error in getInspectionById:", error);
    next(error);
  }
};

exports.logIssue = [
  upload.single('image'), // Add this middleware for handling file uploads
  async (req, res) => {
    try {
      const { inspectionId, description } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const issue = new Issue({
        inspection: inspectionId,
        description,
        imageUrl
      });

      await issue.save();
      res.status(201).json(issue);
    } catch (error) {
      console.error("Error in logIssue:", error);
      res.status(500).json({ message: 'Error logging issue', error: error.message });
    }
  }
];

exports.getIssuesForInspection = async (req, res, next) => {
  try {
    const { inspectionId } = req.params;
    const issues = await Issue.find({ inspection: inspectionId });
    res.json(issues);
  } catch (error) {
    console.error("Error in getIssuesForInspection:", error);
    next(error);
  }
};
