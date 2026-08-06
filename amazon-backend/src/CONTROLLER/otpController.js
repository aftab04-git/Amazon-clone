// Import service functions with different names to avoid conflict
const { sendOTP: sendOtpService, verifyOTP: verifyOtpService, resendOTP: resendOtpService } = require('../SERVICE/otpService');

const requestOTP = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const result = await sendOtpService(email, name);
        if (result.success) {
            res.json({ message: 'OTP sent successfully' });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

        const result = await verifyOtpService(email, otp);
        if (result.success) {
            res.json({ message: 'OTP verified successfully', userData: result.userData });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const result = await resendOtpService(email);
        if (result.success) {
            res.json({ message: 'OTP resent successfully' });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { requestOTP, verifyOTP, resendOTP };