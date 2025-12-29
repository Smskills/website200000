<<<<<<< HEAD
const express = require('express');
const cors = require('cors');

const healthRoute = require('./routes/health');
const enquiryRoute = require('./routes/enquiry');

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/api/health', healthRoute);
app.use('/api/enquiry', enquiryRoute);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

=======

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const healthRoutes = require('./routes/health');
const enquiryRoutes = require('./routes/enquiry');
const adminAuthRoutes = require('./routes/adminAuth');
const courseRoutes = require('./routes/courses');
const noticeRoutes = require('./routes/notices');
const publicRoutes = require('./routes/public');
const { protect } = require('./middleware/authMiddleware');
const enquiryController = require('./controllers/enquiryController');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// SECURITY: Production-grade headers
app.use(helmet());

// SECURITY: Stricter CORS policy for production
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL] 
  : ['*'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS Policy'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 1. PUBLIC ROUTES
app.use('/api/health', healthRoutes);
app.use('/api', publicRoutes);
app.use('/api/enquiry', enquiryRoutes);

// 2. ADMIN ROUTES (CMS & AUTH)
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin/courses', courseRoutes);
app.use('/api/admin/notices', noticeRoutes);

// Protected enquiry retrieval
app.get('/api/admin/enquiries', protect, enquiryController.getAllEnquiries);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Institutional resource not found.' });
});

app.use(errorHandler);

>>>>>>> 96d0b75bfd2d9e6c79feae7589d7f70b5ef7ea3e
module.exports = app;
