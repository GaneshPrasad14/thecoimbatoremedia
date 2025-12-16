require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 5010;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login attempts per windowMs (increased for testing)
  message: 'Too many login attempts, please try again later.',
});

app.use(limiter);
app.use('/admin/login', authLimiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://thecoimbatoremedia.com'
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'], // Allow multiple dev origins
  credentials: true,
}));

app.use(express.json({ limit: '10mb' })); // Limit payload size

// Routes
app.use('/admin', require('./routes/adminRoutes'));
app.use('/careers', require('./routes/careerRoutes'));
app.use('/reviews', require('./routes/reviewRoutes'));
app.use('/about', require('./routes/aboutRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});