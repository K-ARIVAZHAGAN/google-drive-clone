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

// S3 Test Endpoint
app.get('/api/test-s3', async (req, res) => {
    try {
        const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');
        const s3 = new S3Client({
            region: process.env.AWS_REGION ? process.env.AWS_REGION.trim() : 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID.trim() : '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY.trim() : '',
            }
        });
        const command = new ListBucketsCommand({});
        const data = await s3.send(command);
        res.json({ success: true, buckets: data.Buckets, region: process.env.AWS_REGION });
    } catch (err) {
        console.error("S3 Test Error:", err);
        res.status(500).json({ success: false, error: err.message, stack: err.stack });
    }
});

app.get('/', (req, res) => {
    res.send('Google Drive Clone API is running');
});

// Serve static assets in production (optional for later)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
