// backend/controllers/reportController.js
const pdfGenerator = require('../utils/pdfGenerator');
const Inspection = require('../models/Inspection');
const Issue = require('../models/Issue');

// Generate a PDF compliance report for an inspection
exports.generateReport = async (req, res, next) => {
  try {
    const { inspectionId } = req.params;
    const inspection = await Inspection.findById(inspectionId);
    if (!inspection) {
      return res.status(404).json({ message: 'Inspection not found' });
    }
    const issues = await Issue.find({ inspection: inspectionId });

    // Generate the PDF report using the utility function
    const pdfBuffer = await pdfGenerator.generateInspectionReport(inspection, issues);

    // Set the response headers for PDF download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="inspection-report-${inspectionId}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};
