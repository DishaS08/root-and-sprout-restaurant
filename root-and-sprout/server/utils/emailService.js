const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const logToFile = (message) => {
    try {
        const logPath = path.join(__dirname, '../email_logs.txt');
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logPath, `[${timestamp}] ${message}\n`);
    } catch (err) {
        console.error('Failed to write to log file:', err);
    }
};

// Generic send email function
const sendEmail = async (to, subject, html) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            const msg = '⚠️ Email credentials missing in .env. Skipping email send.';
            console.warn(msg);
            logToFile(msg);
            return false;
        }

        const logMsg = `📨 Attempting to send email to: ${to} | Subject: ${subject}`;
        console.log(logMsg);
        logToFile(logMsg);

        const mailOptions = {
            from: `"Root & Sprout" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        const successMsg = `✅ Email successfully sent! ID: ${info.messageId} Response: ${info.response}`;
        console.log(successMsg);
        logToFile(successMsg);
        return true;
    } catch (error) {
        const errorMsg = `❌ Error sending email: ${error.message}`;
        console.error(errorMsg);
        logToFile(errorMsg);
        return false;
    }
};

// Templates
const sendWelcomeEmail = async (email, name) => {
    const subject = 'Welcome to Root & Sprout!';
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4CAF50;">Welcome to Root & Sprout!</h1>
            <p>Hi ${name},</p>
            <p>Thank you for joining us. We are excited to have you on our culinary journey.</p>
            <p>Explore our menu and book your first reservation today!</p>
            <br>
            <p>Best regards,</p>
            <p>The Root & Sprout Team</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

const sendLoginAlert = async (email, name) => {
    const subject = 'New Login Alert - Root & Sprout';
    const html = `
        <div style="font-family: Arial, sans-serif;">
            <h2>New Login Detected</h2>
            <p>Hi ${name},</p>
            <p>We detected a new login to your Root & Sprout account.</p>
            <p>If this was you, you can ignore this email.</p>
            <p>Time: ${new Date().toLocaleString()}</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

const sendReservationConfirmation = async (email, name, reservationDetails) => {
    const subject = 'Reservation Confirmed - Root & Sprout';
    const html = `
        <div style="font-family: Arial, sans-serif;">
            <h2 style="color: #4CAF50;">Reservation Confirmed!</h2>
            <p>Hi ${name},</p>
            <p>Your table has been reserved successfully.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                <p><strong>Date:</strong> ${reservationDetails.date}</p>
                <p><strong>Time:</strong> ${reservationDetails.time}</p>
                <p><strong>Guests:</strong> ${reservationDetails.guests}</p>
                <p><strong>Table:</strong> ${reservationDetails.tableId}</p>
            </div>
            <p>We look forward to serving you!</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

const sendFeedbackAck = async (email, name) => {
    const subject = 'We received your feedback - Root & Sprout';
    const html = `
        <div style="font-family: Arial, sans-serif;">
            <h2>Thank You!</h2>
            <p>Hi ${name},</p>
            <p>We have received your message. Our team will review it and get back to you shortly.</p>
            <br>
            <p>Best regards,</p>
            <p>The Root & Sprout Team</p>
        </div>
    `;
    return sendEmail(email, subject, html);
};

module.exports = {
    sendEmail,
    sendWelcomeEmail,
    sendLoginAlert,
    sendReservationConfirmation,
    sendFeedbackAck
};
