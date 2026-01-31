require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


const connectDB = require('./config/db');

// Connect Database
connectDB();

// Middleware
app.use(cors({
    origin: '*' // Temporarily allow all for debugging
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/files', require('./routes/files'));

app.get('/', (req, res) => {
    res.send('Google Drive Clone API is running');
});

// Serve static assets in production (optional for later)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
