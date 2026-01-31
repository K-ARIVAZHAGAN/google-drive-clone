const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3'); // v3
const multerS3 = require('multer-s3');
const path = require('path');

const s3 = new S3Client({
    region: process.env.AWS_REGION ? process.env.AWS_REGION.trim() : 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID.trim() : '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY.trim() : '',
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Create unique key: user_id/timestamp-filename
            const userId = req.user ? req.user.id : 'anonymous';
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${userId}/${uniqueSuffix}${path.extname(file.originalname)}`);
        }
    })
});

module.exports = { upload, s3 }; // Export s3 for deletion logic
