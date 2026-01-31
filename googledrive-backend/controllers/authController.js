const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Helper to sign JWT
const signToken = (id) => {
    return jwt.sign({ user: { id } }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.testEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.send('Please provide email query param. e.g. /test-email?email=you@test.com');

        console.log(`Testing email to: ${email}`);
        console.log(`User: ${process.env.EMAIL_USER}`);
        // Log stripped password length for safety
        const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : 'MISSING';
        console.log(`Pass Length: ${pass.length}`);

        await sendEmail({
            email: email,
            subject: 'Render Debug Email',
            message: 'If you see this, email is working on Render!'
        });

        res.send(`<h1>Email Sent Successfully to ${email}</h1>`);
    } catch (err) {
        console.error(err);
        res.send(`<h1>Email Failed</h1><pre>${err.message}</pre><pre>${JSON.stringify(err, null, 2)}</pre>`);
    }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');

        user = new User({
            firstName,
            lastName,
            email,
            password,
            verificationToken,
            isVerified: false // Explicitly false
        });

        await user.save();

        // Send email
        // Send email
        const clientUrl = process.env.CLIENT_URL; // Using Env Variable
        const verificationUrl = `${clientUrl}/verify-email/${verificationToken}`;
        const message = `Please verify your email by clicking the link: \n\n ${verificationUrl}`;

        try {
            // HTML Email Template
            const htmlMessage = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #4285F4; margin: 0;">Google Drive Clone</h1>
                </div>
                <div style="padding: 20px; text-align: center;">
                    <h2 style="color: #333333;">Verify your email address</h2>
                    <p style="color: #666666; font-size: 16px; line-height: 1.5;">Thanks for signing up for Google Drive Clone! We're excited to have you on board.</p>
                    <p style="color: #666666; font-size: 16px; line-height: 1.5;">Please confirm your email address to activate your account and start storing files.</p>
                    <div style="margin: 30px 0;">
                        <a href="${verificationUrl}" style="background-color: #4285F4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email Address</a>
                    </div>
                    <p style="color: #999999; font-size: 14px;">Or copy and paste this link into your browser:</p>
                    <p style="color: #4285F4; font-size: 14px; word-break: break-all;">${verificationUrl}</p>
                </div>
                <div style="text-align: center; margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
                    <p style="color: #999999; font-size: 12px;">This link will expire in 24 hours.</p>
                </div>
            </div>
            `;

            await sendEmail({
                email: user.email,
                subject: 'VERIFICATION REQUIRED - Google Drive Clone (V2)', // Updated Subject to track version
                message: message, // Plain text fallback
                html: htmlMessage // Rich HTML version
            });
            res.json({ msg: 'Registration successful. Please check your email to verify account.' });
        } catch (error) {
            console.error('Email Send Failed (Network/Auth Error).');
            console.error(error);

            // Log the link so Admin can manually verify user in logs
            console.log('##################################################');
            console.log('# MANUAL VERIFICATION LINK (COPY THIS)           #');
            console.log(verificationUrl);
            console.log('##################################################');

            // Return Success so frontend doesn't hang.
            return res.status(200).json({
                msg: 'Registration Accepted! Email service is slow/blocked, but your account is created. Please Login.'
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Verify Email
// @route   POST /api/auth/verify-email
// @access  Public
exports.verifyEmail = async (req, res) => {
    const { token } = req.body;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ msg: 'Email verified successfully. You can now login.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ msg: 'Account not verified. Please check your email.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const clientUrl = process.env.CLIENT_URL;
        const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
        const message = `You requested a password reset. Please click the link: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset - Google Drive Clone',
                message
            });
            res.json({ msg: 'Password reset link sent to email' });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            return res.status(500).json({ msg: 'Email could not be sent' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
        }

        user.password = newPassword; // Will be hashed by pre-save hook
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ msg: 'Password has been updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
