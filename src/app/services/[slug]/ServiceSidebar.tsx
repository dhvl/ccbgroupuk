"use client";

import Link from 'next/link';
import { useModal } from '@/components/ModalContext';
import styles from './service-detail.module.css';
import { Service } from '@/data/services';

interface Props {
  otherServices: Service[];
}

const ServiceSidebar = ({ otherServices }: Props) => {
  const { openModal } = useModal();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.quoteCard}>
        <h3>Get an Instant Quote</h3>
        <p className={styles.quoteText}>
          Text a photo of your house to <strong>07956 552 477</strong> for a fast estimate!
        </p>
        <button onClick={openModal} className={styles.enquireBtn}>
          ENQUIRE ONLINE <span>→</span>
        </button>
      </div>

      <div className={styles.otherServicesSection}>
        <h3>Other Services</h3>
        <div className={styles.serviceBoxGrid}>
          {otherServices.map(s => (
            <Link key={s.slug} href={`/services/${s.slug}`} className={styles.serviceBoxItem}>
              <div className={styles.serviceBoxContent}>
                <span className={styles.serviceTitle}>{s.title}</span>
                <span className={styles.learnMore}>Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/services" className={styles.viewAllBtn}>View All Services</Link>
      </div>
    </aside>
  );
};

export default ServiceSidebar;
