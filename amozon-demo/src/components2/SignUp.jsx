import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import OTPVerification from './OTPVerfication';
import "./SignUp.css";

function SignUp() {
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      password: formData.get('password'),
    };

    // Request OTP
    try {
      await api.requestOTP(data.email, data.name);
      setUserData(data);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async () => {
    setLoading(true);
    try {
      const result = await api.signUp({ ...userData, otpVerified: true });
      // Auto login: token and user already saved in api.signUp
      navigate('/');
      window.location.reload(); // refresh to update navbar
    } catch (err) {
      setError(err.message);
      setStep(1); // go back to form on error
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <OTPVerification
        email={userData?.email}
        name={userData?.name}
        onVerify={handleOTPVerify}
      />
    );
  }

  return (
    <section className="signup-page">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
        className="amazon-logo"
      />
      <form className="signup-box" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        {error && <div className="error-message">{error}</div>}
        <label>Your name</label>
        <input type="text" name="name" placeholder="First and last name" required />
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" required />
        <label>Mobile number</label>
        <div className="mobile-input">
          <select><option>IN +91</option></select>
          <input type="text" name="mobile" placeholder="Mobile number" required />
        </div>
        <label>Password</label>
        <input type="password" name="password" placeholder="At least 6 characters" required minLength="6" />
        <p className="info-text">Passwords must be at least 6 characters.</p>
        <button type="submit" className="signup-btn" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Continue'}
        </button>
        <hr />
        <p className="signin-link">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
}

export default SignUp;