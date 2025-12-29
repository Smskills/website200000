
const bcrypt = require('bcryptjs');

/**
 * Institutional Hashing Protocol
 * Generates a secure salt and hashes the password.
 */
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Verification Protocol
 * Compares plaintext input with stored hash.
 */
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
