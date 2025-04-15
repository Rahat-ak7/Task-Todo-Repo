require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
// CORS Setup
const allowedOrigins = [process.env.FRONTEND_ORIGIN];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Todo API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});