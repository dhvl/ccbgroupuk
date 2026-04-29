import Image from 'next/image';
import styles from './TrustBar.module.css';

const TrustBar = () => {
  return (
    <section className={styles.trustBar}>
      <div className="container">
        <div className={styles.flex}>
          <div className={styles.logoItem}>
            <Image src="/images/logo-trustmark.webp" alt="TrustMark" width={150} height={60} objectFit="contain" />
          </div>
          <div className={styles.logoItem}>
            <Image src="/images/logo-chas.webp" alt="CHAS Accredited" width={150} height={60} objectFit="contain" />
          </div>
          <div className={styles.logoItem}>
            <Image src="/images/logo-niceic.webp" alt="NICEIC Approved" width={150} height={60} objectFit="contain" />
          </div>
          <div className={styles.infoItem}>
            <p><strong>VAT Reg:</strong> 284 6962 52</p>
          </div>
          <div className={styles.infoItem}>
            <p><strong>5★</strong> Google Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
