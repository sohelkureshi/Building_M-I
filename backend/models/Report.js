// backend/models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  inspection: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspection', required: true },
  generatedAt: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
});

module.exports = mongoose.model('Report', ReportSchema);
