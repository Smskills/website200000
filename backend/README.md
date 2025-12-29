
# SM Skills - Institutional Backend (Foundation)

This is the decoupled backend foundation for the SM Skills Training Institute. It is built for security, stability, and future scalability.

## Step 1: Foundation Features
- **Independent Project Root**: Separated from frontend to ensure architectural purity.
- **Security Defaults**: 
    - `Helmet` headers for XSS and Clickjacking protection.
    - JSON payload limits to prevent DOS.
    - CORS filtering.
- **Database Ready**: MySQL connection pool configured using environment variables.
- **Fail-Safe Health Checks**: Endpoint at `/api/health` reports system status without exposing internal paths.
- **Clean Error Handling**: Production environments will never leak stack traces.

## Installation
1. Navigate to `/backend`
2. Run `npm install`
3. Copy `.env.example` to `.env` and configure your local credentials.

## Running the Server
- Development: `npm run dev`
- Production: `npm start`

## Verification
Once running, verify the foundation by visiting:
`GET http://localhost:5000/api/health`

**Expected Response:**
```json
{
  "status": "ok",
  "services": {
    "database": "ok",
    "api": "active"
  }
}
```

## Intentionally Not Implemented (Step 1)
- Business Logic (Courses, Enquiries)
- User Authentication / JWT
- Data Migrations (Table creation)
- Frontend Integration
