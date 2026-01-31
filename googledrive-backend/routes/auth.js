const express = require('express');
const router = express.Router();
const { register, verifyEmail, login, forgotPassword, resetPassword, testEmail } = require('../controllers/authController');

router.get('/test-email', testEmail);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
