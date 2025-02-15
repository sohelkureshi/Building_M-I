// backend/utils/pdfGenerator.js
const PDFDocument = require('pdfkit');

exports.generateInspectionReport = (inspection, issues) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Add a header
      doc.fontSize(20).text('Inspection Report', { align: 'center' });
      doc.moveDown();

      // Inspection details
      doc.fontSize(12).text(`Facility ID: ${inspection.facilityId}`);
      doc.text(`Scheduled Date: ${new Date(inspection.scheduledDate).toLocaleString()}`);
      doc.text(`Inspector: ${inspection.inspector}`);
      doc.moveDown();

      doc.text('Notes:');
      doc.text(inspection.notes || 'N/A');
      doc.moveDown();

      // List issues
      doc.fontSize(16).text('Issues:', { underline: true });
      doc.moveDown();

      if (issues.length > 0) {
        issues.forEach((issue, index) => {
          doc.fontSize(12).text(`${index + 1}. ${issue.description}`);
          if (issue.imageUrl) {
            doc.text(`Image URL: ${issue.imageUrl}`);
          }
          doc.moveDown();
        });
      } else {
        doc.text('No issues reported.');
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
