const crypto = require('crypto');
const { sendOTPEmail } = require('./emailService');

const otpStore = new Map();

setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            console.log(`🗑️ OTP expired for ${email}`);
            otpStore.delete(email);
        }
    }
}, 60000);

const normalizeEmail = (email) => email.trim().toLowerCase();

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendOTP = async (email, name = 'User') => {
    try {
        const normalizedEmail = normalizeEmail(email);
        const otp = generateOTP();
        const expiresAt = Date.now() + (process.env.OTP_EXPIRE || 10) * 60 * 1000;

        otpStore.set(normalizedEmail, {
            otp,
            expiresAt,
            attempts: 0,
            name
        });

        console.log(`📧 OTP for ${normalizedEmail}: ${otp} (expires at ${new Date(expiresAt).toLocaleTimeString()})`);

        await sendOTPEmail(email, name, otp);
        return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, message: 'Failed to send OTP' };
    }
};

const verifyOTP = (email, userOTP) => {
    const normalizedEmail = normalizeEmail(email);
    const storedData = otpStore.get(normalizedEmail);
    
    console.log(`🔍 Verifying OTP for ${normalizedEmail}, stored:`, storedData);

    if (!storedData) {
        console.log(`❌ No OTP found for ${normalizedEmail}`);
        return { success: false, message: 'OTP expired or not found' };
    }

    if (storedData.attempts >= 3) {
        console.log(`❌ Too many attempts for ${normalizedEmail}`);
        otpStore.delete(normalizedEmail);
        return { success: false, message: 'Too many failed attempts. Request new OTP' };
    }

    if (Date.now() > storedData.expiresAt) {
        console.log(`❌ OTP expired for ${normalizedEmail}`);
        otpStore.delete(normalizedEmail);
        return { success: false, message: 'OTP expired' };
    }

    if (storedData.otp !== userOTP) {
        storedData.attempts += 1;
        otpStore.set(normalizedEmail, storedData);
        console.log(`❌ Invalid OTP for ${normalizedEmail}, attempt ${storedData.attempts}`);
        return { success: false, message: 'Invalid OTP' };
    }

    console.log(`✅ OTP verified for ${normalizedEmail}`);
    const userData = { name: storedData.name };
    otpStore.delete(normalizedEmail);
    return { success: true, message: 'OTP verified successfully', userData };
};

const resendOTP = async (email) => {
    const normalizedEmail = normalizeEmail(email);
    if (otpStore.has(normalizedEmail)) {
        const oldData = otpStore.get(normalizedEmail);
        otpStore.delete(normalizedEmail);
        console.log(`🔄 Resending OTP for ${normalizedEmail}`);
        return await sendOTP(email, oldData.name);
    }
    return { success: false, message: 'No pending OTP request' };
};

module.exports = { sendOTP, verifyOTP, resendOTP };