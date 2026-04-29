"use client";

import { useState } from 'react';
import styles from './InquiryForm.module.css';

interface InquiryFormProps {
  onSuccess?: () => void;
  compact?: boolean;
}

const InquiryForm = ({ onSuccess, compact }: InquiryFormProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Basic bot protection
    if (data.honeypot) {
      setStatus('success');
      return;
    }

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        if (onSuccess) setTimeout(onSuccess, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
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
            <option value="electrical">Electrical</option>
            <option value="gutters">Gutter Cleaning/Repairs</option>
            <option value="plumbing">Plumbing</option>
            <option value="roofing">Roofing</option>
            <option value="plastering">Plastering & Rendering</option>
            <option value="carpentry">Carpentry & Joinery</option>
            <option value="painting">Painting & Decorating</option>
            <option value="fencing">Fencing & Landscaping</option>
            <option value="damp">Damp Proofing</option>
            <option value="general">General Maintenance</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label>Your Message*</label>
        <textarea name="message" placeholder="Please describe your requirements..." rows={compact ? 3 : 5} required></textarea>
      </div>

      {/* Honeypot Field */}
      <div style={{ display: 'none' }}>
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'SENDING...' : 'SEND ENQUIRY'}
      </button>
      
      {status === 'error' && <p className={styles.error}>Something went wrong. Please try again or call us.</p>}
    </form>
  );
};

export default InquiryForm;
