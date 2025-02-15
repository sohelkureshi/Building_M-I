// backend/models/Inspection.js
const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema(
  {
    facilityId: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    inspector: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inspection', InspectionSchema);
