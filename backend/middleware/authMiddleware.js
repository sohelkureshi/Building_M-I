// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // decoded contains { userId, role, iat, exp }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
