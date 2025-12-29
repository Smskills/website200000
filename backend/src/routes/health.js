<<<<<<< HEAD
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok' });
=======

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  let dbStatus = 'ok';
  
  try {
    await pool.query('SELECT 1');
  } catch (err) {
    dbStatus = 'unavailable';
  }

  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    services: {
      database: dbStatus,
      api: 'active'
    },
    version: '1.0.0-foundation'
  });
>>>>>>> 96d0b75bfd2d9e6c79feae7589d7f70b5ef7ea3e
});

module.exports = router;
