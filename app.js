const express = require('express');
const publicRoutes = require('./routes/publicRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');
const authMiddleware = require('./middleware/authMiddleware');
const rateLimit = require('./config/rateLimit');

const app = express();
app.use(express.json());
app.use(requestLogger);  // Log requests
app.use(rateLimit);      // Rate limit requests

// Public routes that don't require token validation
app.use('/api', publicRoutes);

// Protected routes that require token validation
app.use('/api', authMiddleware, protectedRoutes);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
