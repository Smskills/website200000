
const validator = require('validator');

const validateEnquiry = (req, res, next) => {
  const { name, email, phone, message } = req.body;
  const errors = [];

  // 1. Presence Check
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ status: 'error', message: 'All fields are mandatory.' });
  }

  // 2. Name Validation (Reasonable length, no special chars)
  if (!validator.isLength(name, { min: 2, max: 100 })) {
    errors.push('Name must be between 2 and 100 characters.');
  }

  // 3. Email Validation
  if (!validator.isEmail(email)) {
    errors.push('A valid institutional or personal email is required.');
  }

  // 4. Phone Validation (Basic numeric check)
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 10 || cleanPhone.length > 15) {
    errors.push('Phone number must be between 10 and 15 digits.');
  }

  // 5. Message Validation
  if (!validator.isLength(message, { min: 10, max: 2000 })) {
    errors.push('Message must be between 10 and 2000 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', errors });
  }

  // Sanitization: Escape HTML and trim whitespace
  req.body.name = validator.escape(validator.trim(name));
  req.body.email = validator.normalizeEmail(email);
  req.body.phone = cleanPhone;
  req.body.message = validator.escape(validator.trim(message));

  next();
};

module.exports = validateEnquiry;
