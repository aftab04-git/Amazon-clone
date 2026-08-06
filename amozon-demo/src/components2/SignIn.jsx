import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import styles from './SignIn.module.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.signIn(email, password);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.amazon}>amazon</span>
          <span className={styles.domain}>.in</span>
        </div>
      </div>
      <div className={styles.loginBox}>
        <h1>Sign in</h1>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Continue'}
          </button>
        </form>
        <p className={styles.terms}>
          By continuing, you agree to Amazon's <a href="/">Conditions of Use</a> and <a href="/">Privacy Notice</a>.
        </p>
        <hr />
        <div className={styles.newUserSection}>
          <p className={styles.newUserText}>New to Amazon?</p>
          <Link to="/signup" className={styles.createAccountLink}>Create your Amazon account</Link>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/">Conditions of Use</a>
          <a href="/">Privacy Notice</a>
          <a href="/">Help</a>
        </div>
        <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default SignIn;