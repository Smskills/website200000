
/**
 * SM Skills - Operational Monitor
 * Simple heartbeat check for institutional API.
 */
const http = require('http');

const API_URL = process.env.API_URL || 'http://localhost:5000/api/health';
const INTERVAL = 60000; // 1 minute

console.log(`[MONITOR] Monitoring started for: ${API_URL}`);

setInterval(() => {
  http.get(API_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        const status = JSON.parse(data);
        if (status.services.database !== 'ok') {
          console.error(`[ALERT] ${new Date().toISOString()}: Database service unreachable.`);
        }
      } else {
        console.error(`[ALERT] ${new Date().toISOString()}: API returned status ${res.statusCode}`);
      }
    });
  }).on('error', (err) => {
    console.error(`[CRITICAL] ${new Date().toISOString()}: API server is DOWN. ${err.message}`);
  });
}, INTERVAL);
