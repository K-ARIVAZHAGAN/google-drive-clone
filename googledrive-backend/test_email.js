
require('dotenv').config();
const nodemailer = require('nodemailer');

const run = async () => {
    console.log("Testing Email...");
    const user = process.env.EMAIL_USER;
    // Remove spaces from password just in case
    const pass = process.env.EMAIL_PASS.replace(/\s+/g, '');

    console.log("User:", user);
    console.log("Pass (first 4 chars):", pass.substring(0, 4));

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });

    try {
        await transporter.verify();
        console.log("SMTP Connection Verfied! (Credentials are correct)");

        await transporter.sendMail({
            from: user,
            to: user, // Send to self
            subject: "Test Email from Google Drive Clone",
            text: "If you see this, email is working!"
        });
        console.log("Email Sent Successfully!");
    } catch (err) {
        console.error("Error:", err.message);
        console.error("Code:", err.code);
        if (err.response) console.error("Response:", err.response);
    }
};

run();
