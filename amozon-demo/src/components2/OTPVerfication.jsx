import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import './OTPVerification.css'; // Regular CSS, not module

const OTPVerification = ({ email, name, onVerify }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value.slice(0, 1);
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await api.verifyOTP(email, otpString);
            // onVerify expects to receive userData (optional)
            onVerify(result.userData);
        } catch (err) {
            setError(err.message || 'Invalid OTP');
            setOtp(['', '', '', '', '', '']);
            document.getElementById('otp-0')?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        setError('');

        try {
            await api.resendOTP(email);
            setTimer(60);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
        } catch (err) {
            setError(err.message || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-container">
            <h2>Verify Your Email</h2>
            <p>We've sent a 6-digit code to <strong>{email}</strong></p>
            
            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="otp-input"
                        disabled={loading}
                    />
                ))}
            </div>
            
            {error && <p className="error-message">{error}</p>}
            
            <button 
                onClick={handleVerify}
                disabled={loading || otp.join('').length !== 6}
                className="verify-btn"
            >
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <div className="resend-section">
                {canResend ? (
                    <button 
                        onClick={handleResend}
                        disabled={loading}
                        className="resend-btn"
                    >
                        Resend OTP
                    </button>
                ) : (
                    <p className="timer">Resend OTP in {timer} seconds</p>
                )}
            </div>
        </div>
    );
};

export default OTPVerification;