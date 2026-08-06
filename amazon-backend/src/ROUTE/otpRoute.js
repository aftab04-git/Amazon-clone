const express = require('express');
const router = express.Router();
const { requestOTP, verifyOTP, resendOTP } = require('../CONTROLLER/otpController');

router.post('/request', requestOTP);
router.post('/verify', verifyOTP);
router.post('/resend', resendOTP);

module.exports = router;