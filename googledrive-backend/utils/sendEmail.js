const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Simplest for hackathons
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS.replace(/\s+/g, '') // Remove spaces from App Password
        }
    });

    // 2. Define email options
    const mailOptions = {
        from: `Google Drive Clone <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html // Optional: if you want to send HTML
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
