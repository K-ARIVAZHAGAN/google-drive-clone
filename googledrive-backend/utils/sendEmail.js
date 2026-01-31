const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s+/g, '') // Remove spaces for safety
    },
    // TIMEOUTS ARE CRITICAL ON CLOUD TO PREVENT HANGING
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000,
    logger: true,
    debug: true
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
