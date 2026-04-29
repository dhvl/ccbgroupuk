"use client";

import { X } from 'lucide-react';
import styles from './InquiryModal.module.css';
import InquiryForm from './InquiryForm';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InquiryModal = ({ isOpen, onClose }: InquiryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        <div className={styles.content}>
          <h2>Request a Free Quote</h2>
          <p>Please fill out the form below and we'll get back to you within 24 hours.</p>
          <InquiryForm compact onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
