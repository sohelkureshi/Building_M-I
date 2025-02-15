// backend/utils/fileUpload.js
const multer = require('multer');
const path = require('path');

// Define storage options for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists or create it
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with original extension
  },
});

// Filter to accept only images
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('File is not an image'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
