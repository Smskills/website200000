
const pool = require('../config/db');

exports.getPublicCourses = async (req, res, next) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, title, description, duration, mode FROM courses ORDER BY created_at DESC'
    );
    res.json({ status: 'ok', data: rows });
  } catch (err) { next(err); }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM courses ORDER BY created_at DESC');
    res.json({ status: 'ok', data: rows });
  } catch (err) { next(err); }
};

exports.createCourse = async (req, res, next) => {
  const { title, description, duration, mode } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO courses (title, description, duration, mode) VALUES (?, ?, ?, ?)',
      [title, description, duration, mode]
    );
    res.status(201).json({ status: 'ok', data: { id: result.insertId } });
  } catch (err) { next(err); }
};

exports.updateCourse = async (req, res, next) => {
  const { title, description, duration, mode } = req.body;
  const { id } = req.params;
  try {
    const [result] = await pool.execute(
      'UPDATE courses SET title = ?, description = ?, duration = ?, mode = ? WHERE id = ?',
      [title, description, duration, mode, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ status: 'error', message: 'Course not found' });
    res.json({ status: 'ok', message: 'Course updated.' });
  } catch (err) { next(err); }
};

exports.deleteCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute('DELETE FROM courses WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ status: 'error', message: 'Course not found' });
    res.json({ status: 'ok', message: 'Course purged.' });
  } catch (err) { next(err); }
};
