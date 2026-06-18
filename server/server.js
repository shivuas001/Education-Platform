const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./db');
// Route files
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// Load environment variables
dotenv.config();

console.log("ENV VALUE:", process.env.MONGODB_URI);

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/courses', require('./routes/course'));

app.get('/', (req, res) => {
  res.json({ message: "Welcome to EduNova API Server" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
