const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String, // Filename on S3 (unique)
        required: true,
    },
    originalName: {
        type: String, // Original upload name
        required: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    s3Key: {
        type: String,
        required: true,
    },
    s3Url: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null, // Null means root directory
    },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
