const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { getFiles, createFolder, uploadFile, deleteFile, deleteFolder, downloadFile } = require('../controllers/fileController');

router.get('/', auth, getFiles);
router.post('/folder', auth, createFolder);
router.post('/upload', auth, upload.single('file'), uploadFile);
router.delete('/:id', auth, deleteFile);
router.get('/download/:id', auth, downloadFile);
router.delete('/folder/:id', auth, deleteFolder);

module.exports = router;
