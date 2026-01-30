const File = require('../models/File');
const Folder = require('../models/Folder');
const { s3 } = require('../middleware/upload');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

// @desc    Get files and folders for a specific folder (or root)
// @route   GET /api/files?folderId=...
exports.getFiles = async (req, res) => {
    try {
        const parentFolderId = req.query.folderId || null;
        const userId = req.user.id;

        const folders = await Folder.find({ user: userId, parentFolder: parentFolderId });
        const files = await File.find({ user: userId, folder: parentFolderId });

        res.json({ folders, files });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Create Folder
// @route   POST /api/files/folder
exports.createFolder = async (req, res) => {
    try {
        const { name, parentFolderId } = req.body;

        // Check if parent folder exists if provided
        if (parentFolderId) {
            const parent = await Folder.findById(parentFolderId);
            if (!parent) return res.status(404).json({ msg: 'Parent folder not found' });
        }

        const newFolder = new Folder({
            name,
            user: req.user.id,
            parentFolder: parentFolderId || null
        });

        await newFolder.save();
        res.json(newFolder);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Upload File Metadata (S3 upload handled by middleware)
// @route   POST /api/files/upload
exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    try {
        const { parentFolderId } = req.body;

        const newFile = new File({
            filename: req.file.key, // S3 Key
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            s3Key: req.file.key,
            s3Url: req.file.location, // From multer-s3
            user: req.user.id,
            folder: parentFolderId || null
        });

        await newFile.save();
        res.json(newFile);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete File
// @route   DELETE /api/files/:id
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, user: req.user.id });
        if (!file) return res.status(404).json({ msg: 'File not found' });

        // Delete from S3
        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.s3Key
        });

        try {
            await s3.send(deleteCommand);
        } catch (s3Err) {
            console.error("S3 Delete Error", s3Err);
            // Continue to delete from DB even if S3 fails? Maybe.
        }

        await File.deleteOne({ _id: req.params.id });
        // Mongoose 7+ uses deleteOne, not remove()

        res.json({ msg: 'File deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete Folder (Recursive deletion is complex, doing simple for now)
// @route   DELETE /api/files/folder/:id
exports.deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findOne({ _id: req.params.id, user: req.user.id });
        if (!folder) return res.status(404).json({ msg: 'Folder not found' });

        // Check if empty
        const subFolders = await Folder.countDocuments({ parentFolder: folder._id });
        const files = await File.countDocuments({ folder: folder._id });

        if (subFolders > 0 || files > 0) {
            return res.status(400).json({ msg: 'Folder is not empty' });
        }

        await Folder.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Folder deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Get Presigned URL for Download
// @route   GET /api/files/download/:id
exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, user: req.user.id });
        if (!file) return res.status(404).json({ msg: 'File not found' });

        const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
        const { GetObjectCommand } = require("@aws-sdk/client-s3");

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.s3Key,
            ResponseContentDisposition: `attachment; filename="${file.originalName}"`
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour

        res.json({ url });
    } catch (err) {
        console.error("Download Error", err);
        res.status(500).send('Server Error');
    }
};
