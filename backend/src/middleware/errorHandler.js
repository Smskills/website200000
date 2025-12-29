
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // SECURITY: Internal logging (not exposed to client)
  console.error(`[INTERNAL_ERROR] ${new Date().toISOString()}: ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // SECURITY: Generic messages for production to prevent path traversal/stack trace leakage
  res.status(statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'A system error occurred. Please contact the administrator.' 
      : err.message,
    errors: err.errors || null
  });
};

module.exports = errorHandler;
