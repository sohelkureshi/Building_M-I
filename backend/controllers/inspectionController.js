// backend/controllers/inspectionController.js
const mongoose = require('mongoose');
const Inspection = require('../models/Inspection');
const Issue = require('../models/Issue');

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

    // Convert the inspector string (from token) to a valid ObjectId using 'new'
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

exports.logIssue = async (req, res, next) => {
  try {
    const { inspectionId, description, imageUrl } = req.body;
    const newIssue = new Issue({
      inspection: inspectionId,
      description,
      imageUrl,
    });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    next(error);
  }
};

exports.getIssuesForInspection = async (req, res, next) => {
  try {
    const { inspectionId } = req.params;
    const issues = await Issue.find({ inspection: inspectionId });
    res.json(issues);
  } catch (error) {
    next(error);
  }
};
