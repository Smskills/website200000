
const validator = require('validator');

const validateNotice = (req, res, next) => {
  const { title, content } = req.body;
  const errors = [];

  if (!title || validator.isEmpty(title)) errors.push('Notice title is required.');
  if (!content || validator.isEmpty(content)) errors.push('Notice content is required.');

  if (title && !validator.isLength(title, { min: 5, max: 255 })) errors.push('Title must be 5-255 chars.');

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', errors });
  }

  req.body.title = validator.escape(validator.trim(title));
  req.body.content = validator.escape(validator.trim(content));

  next();
};

module.exports = validateNotice;
