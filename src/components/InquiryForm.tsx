"use client";

import { useState, useEffect } from 'react';
import styles from './InquiryForm.module.css';

interface InquiryFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const InquiryForm = ({ onSuccess, compact }: InquiryFormProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loadTime, setLoadTime] = useState<number>(0);

  useEffect(() => {
    setLoadTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic client-side honeypot check
    if (data.honeypot || data.website_url) {
      setStatus('success');
      return;
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          _ts: loadTime || Date.now(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success) {
        setStatus('success');
        if (onSuccess) setTimeout(onSuccess, 2000);
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please check your details and try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again or call us on 01727 614464.');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <h3>Thank you!</h3>
        <p>Your enquiry has been sent. We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={compact ? styles.compactGrid : styles.formGrid}>
        <div className={styles.inputGroup}>
          <label>Your Name*</label>
          <input name="name" type="text" placeholder="John Doe" required />
        </div>
        <div className={styles.inputGroup}>
          <label>Email Address*</label>
          <input name="email" type="email" placeholder="john@example.com" required />
        </div>
        <div className={styles.inputGroup}>
          <label>Phone Number*</label>
          <input name="phone" type="tel" placeholder="07123 456 789" required />
        </div>
        <div className={styles.inputGroup}>
          <label>Postcode*</label>
          <input name="postcode" type="text" placeholder="AL1 4TA" required />
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label>Service Required*</label>
        <div className={styles.selectWrapper}>
          <select name="service" required>
            <option value="">Select a service...</option>
            <option value="general">Property Maintenance</option>
            <option value="electrical">Electrical</option>
            <option value="gutters">Gutter Cleaning/Repairs</option>
            <option value="plumbing">Plumbing</option>
            <option value="roofing">Roofing</option>
            <option value="plastering">Plastering & Rendering</option>
            <option value="carpentry">Carpentry & Joinery</option>
            <option value="painting">Painting & Decorating</option>
            <option value="fencing">Fencing & Landscaping</option>
            <option value="damp">Damp Proofing</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label>Your Message*</label>
        <textarea name="message" placeholder="Please describe your requirements..." rows={compact ? 3 : 5} required></textarea>
      </div>

      {/* Hidden Honeypot Fields (Bots will fill these, humans won't) */}
      <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
        <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'SENDING...' : 'SEND ENQUIRY'}
      </button>
      
      {status === 'error' && (
        <p className={styles.error}>{errorMessage || 'Something went wrong. Please try again or call us.'}</p>
      )}
    </form>
  );
};

export default InquiryForm;
