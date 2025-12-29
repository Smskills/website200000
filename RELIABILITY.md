
# SM Skills - Reliability & Recovery (Step 8)

## 💾 Backup Strategy
- **Daily**: Automated `mysqldump` at 02:00 AM via Cron.
- **Weekly**: Manual verification of backup integrity.
- **Retention**: 7-day rolling window on the local server + monthly off-site archive.

### Restore Procedure
In the event of database corruption:
1. `gunzip sm_skills_db_YYYY-MM-DD.sql.gz`
2. `mysql -u admin -p sm_skills_db < sm_skills_db_YYYY-MM-DD.sql`

## 🩺 Monitoring
- **API Health**: Monitored by `scripts/monitor.js`.
- **System Metrics**: PM2 monitors CPU/Memory leaks.
- **Disk Space**: Automated alert if `/var/log` exceeds 80% usage.

## 🚨 Incident Playbook
### Scenario: Server Down
1. Check PM2 logs: `pm2 logs sm-backend`
2. Restart service: `pm2 restart sm-backend`
3. If Nginx failure: `sudo systemctl restart nginx`

### Scenario: Database Failure
1. Verify service: `sudo systemctl status mysql`
2. Check `backend/src/config/db.js` for connectivity leaks.
3. If data loss detected, follow **Restore Procedure**.
