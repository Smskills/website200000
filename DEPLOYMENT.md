
# SM Skills - Deployment Strategy (Step 7)

## 🏗️ Architecture
- **Frontend**: Static assets served via **Nginx**.
- **Backend**: Node.js managed by **PM2** behind an Nginx Reverse Proxy.
- **SSL**: Let's Encrypt (Certbot) for mandatory HTTPS.

## 🔑 Environment Setup
Create `/var/www/sm-skills/backend/.env` with:
- `NODE_ENV=production`
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `JWT_SECRET` (Use a 64-char random string)
- `CORS_ORIGIN=https://yourdomain.edu`

## 🚀 Deployment Steps
1. **Server Hardening**:
   - `sudo ufw allow 'Nginx Full'`
   - `sudo ufw allow ssh`
   - `sudo ufw enable`
2. **Backend**:
   - `cd backend && npm install --production`
   - `pm2 start src/server.js --name sm-backend`
   - `pm2 save`
3. **Frontend**:
   - `npm run build`
   - `sudo cp -r dist/* /var/www/sm-skills/public/`
4. **Proxy Configuration**:
   Map `/api` to `localhost:5000` in Nginx configuration.

## 🛡️ Verification
- [ ] `curl -I https://yourdomain.edu/api/health` returns 200.
- [ ] Security headers (X-Frame-Options, etc.) verified via securityheaders.com.
- [ ] Login rate limiter blocks after 5 failed attempts.
