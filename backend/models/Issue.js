// backend/models/Issue.js
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
  {
    inspection: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspection', required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Issue', IssueSchema);
