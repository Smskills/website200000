
const pool = require('../config/db');
const { comparePassword } = require('../utils/password');
const jwt = require('jsonwebtoken');

/**
 * POST /api/admin/login
 * Verifies credentials and returns a signed JWT.
 */
exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  // 1. Basic validation
  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Credentials missing.' });
  }

  try {
    // 2. Fetch admin (generic error if not found to prevent user enumeration)
    const [rows] = await pool.execute('SELECT * FROM admin WHERE username = ?', [username]);
    const admin = rows[0];

    if (!admin) {
      return res.status(401).json({ status: 'error', message: 'Identity verification failed.' });
    }

    // 3. Verify hash
    const isMatch = await comparePassword(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Identity verification failed.' });
    }

    // 4. Issue token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'institutional_fallback_secret',
      { expiresIn: '8h' }
    );

    res.json({
      status: 'ok',
      message: 'Authority established.',
      token
    });
  } catch (err) {
    next(err);
  }
};
