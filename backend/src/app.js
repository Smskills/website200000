const express = require('express');
const cors = require('cors');

const healthRoute = require('./routes/health');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/health', healthRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
