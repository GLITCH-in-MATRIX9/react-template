require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fileupload = require('express-fileupload');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileupload());

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Connect Database
require('./config/db')();

// Middleware for file upload
app.use(fileupload());

// Define routes here
app.get('/', (req, res) => {
    res.send('File Upload API is running');
});


// Routes
app.get('/', (req, res) => {
  res.send('SafeWeb API');
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/votes', require('./routes/voteRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));