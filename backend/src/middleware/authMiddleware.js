
const jwt = require('jsonwebtoken');

/**
 * Auth Guard
 * Validates the Authorization: Bearer <token> header.
 */
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Access denied. Institutional authority required.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'institutional_fallback_secret');
    req.admin = decoded; // Contains id and username
    next();
  } catch (err) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Invalid or expired authority token.' 
    });
  }
};

module.exports = { protect };
