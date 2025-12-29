
const pool = require('../config/db');

exports.getPublicNotices = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, content, created_at FROM notices WHERE is_active = 1 ORDER BY created_at DESC'
    );
    res.json({ status: 'ok', data: rows });
  } catch (err) { next(err); }
};

exports.getAllNotices = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM notices ORDER BY created_at DESC');
    res.json({ status: 'ok', data: rows });
  } catch (err) { next(err); }
};

exports.createNotice = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO notices (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.status(201).json({ status: 'ok', data: { id: result.insertId } });
  } catch (err) { next(err); }
};

exports.updateNotice = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const [result] = await pool.execute(
      'UPDATE notices SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ status: 'error', message: 'Notice not found' });
    res.json({ status: 'ok', message: 'Notice updated.' });
  } catch (err) { next(err); }
};

exports.toggleStatus = async (req, res, next) => {
  const { id } = req.params;
  const { is_active } = req.body;
  try {
    const [result] = await pool.execute('UPDATE notices SET is_active = ? WHERE id = ?', [is_active ? 1 : 0, id]);
    if (result.affectedRows === 0) return res.status(404).json({ status: 'error', message: 'Notice not found' });
    res.json({ status: 'ok', message: 'Visibility status updated.' });
  } catch (err) { next(err); }
};
