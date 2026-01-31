const { Resend } = require('resend');

const sendEmail = async (options) => {
    // If no API key, check environment
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is missing in environment variables');
        throw new Error('RESEND_API_KEY is missing');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: 'Google Drive Clone <onboarding@resend.dev>', // Free tier must use this or verified domain
            to: [options.email], // Free tier only sends to your own email
            subject: options.subject,
            html: options.message.replace(/\n/g, '<br>') // Simple conversion
        });

        if (error) {
            console.error('Resend API Error:', error);
            throw new Error(error.message);
        }

        console.log('Email sent via Resend successfully:', data);
    } catch (err) {
        console.error('Resend Send Failed:', err);
        throw err;
    }
};

module.exports = sendEmail;
