// backend/config/config.js
module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'IAMHERE',
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/try'
  };
  