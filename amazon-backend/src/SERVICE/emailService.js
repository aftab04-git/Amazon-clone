const nodemailer = require('nodemailer');

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP email
const sendOTPEmail = async (email, name, otp) => {
    const mailOptions = {
        from: `"Amazon Clone" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your OTP for Amazon Clone Verification',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #131921;">Amazon Clone</h1>
                </div>
                <div style="background-color: #f5f6f6; padding: 30px; border-radius: 8px;">
                    <h2 style="color: #0f1111; margin-top: 0;">Hello ${name || 'User'}! 👋</h2>
                    <p style="color: #333; font-size: 16px;">Your One-Time Password (OTP) for verification is:</p>
                    <div style="background-color: #131921; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
                        <span style="font-size: 42px; font-weight: bold; letter-spacing: 8px; color: #ffd814;">${otp}</span>
                    </div>
                    <p style="color: #666; font-size: 14px;">This OTP is valid for ${process.env.OTP_EXPIRE || 10} minutes.</p>
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <p style="color: #856404; margin: 0; font-size: 13px;">⚠️ Never share this OTP with anyone.</p>
                    </div>
                </div>
                <hr style="border: 1px solid #ddd; margin: 30px 0;">
                <p style="color: #999; font-size: 12px; text-align: center;">This is an automated message, please do not reply.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send welcome email after successful registration
const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: `"Amazon Clone" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to Amazon Clone! 🎉',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background-color: #131921; padding: 20px; text-align: center;">
                    <h1 style="color: white;">Welcome, ${name}!</h1>
                </div>
                <div style="padding: 30px;">
                    <p>Thank you for joining Amazon Clone. Start shopping now!</p>
                    <a href="http://localhost:5173" style="display: inline-block; background-color: #ffd814; color: #0f1111; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Shop Now</a>
                </div>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail, sendWelcomeEmail };