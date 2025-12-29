
const pool = require('../config/db');

/**
 * POST /api/enquiry
 * Public submission
 */
exports.submitEnquiry = async (req, res, next) => {
  const { name, email, phone, message, course } = req.body;
  const ip_address = req.ip || req.headers['x-forwarded-for'] || '0.0.0.0';

  try {
    const query = `
      INSERT INTO enquiries (name, email, phone, message, course, ip_address) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, [name, email, phone, message, course, ip_address]);

    res.status(201).json({
      status: 'ok',
      message: 'Enquiry received successfully.'
    });
  } catch (err) { next(err); }
};

/**
 * GET /api/admin/enquiries
 * Admin only retrieval
 */
exports.getAllEnquiries = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM enquiries ORDER BY created_at DESC');
    res.json({ status: 'ok', data: rows });
  } catch (err) { next(err); }
};
