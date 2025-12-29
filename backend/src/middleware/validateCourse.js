
const validator = require('validator');

const validateCourse = (req, res, next) => {
  const { title, description, duration, mode } = req.body;
  const errors = [];
  const allowedModes = ['online', 'offline', 'hybrid'];

  if (!title || validator.isEmpty(title)) errors.push('Course title is required.');
  if (!description || validator.isEmpty(description)) errors.push('Course description is required.');
  if (!duration || validator.isEmpty(duration)) errors.push('Duration is required.');
  if (!mode || !allowedModes.includes(mode)) errors.push('Invalid mode selection.');

  if (title && !validator.isLength(title, { min: 3, max: 255 })) errors.push('Title must be 3-255 chars.');

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', errors });
  }

  // Sanitization
  req.body.title = validator.escape(validator.trim(title));
  req.body.description = validator.escape(validator.trim(description));
  req.body.duration = validator.escape(validator.trim(duration));
  
  next();
};

module.exports = validateCourse;
