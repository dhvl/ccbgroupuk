import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.footerLogoBox}>
              <Link href="/">
                <Image src="/images/logo.webp" alt="CCB Group" width={200} height={60} style={{ width: 'auto', height: '60px' }} />
              </Link>
            </div>
            <p>Specialist Property Maintenance based in St Albans, serving London and the Home Counties.</p>
            <div className={styles.accreditationBox}>
              <Image src="/images/logo-trustmark.webp" alt="TrustMark" width={80} height={35} style={{ objectFit: 'contain' }} />
              <Image src="/images/logo-chas.webp" alt="CHAS" width={80} height={35} style={{ objectFit: 'contain' }} />
              <Image src="/images/logo-niceic.png" alt="NICEIC" width={80} height={35} style={{ objectFit: 'contain' }} />
            </div>
          </div>
          
          <div className={styles.links}>
            <h3>Services</h3>
            <ul>
              <li><Link href="/gutter-cleaning">Gutter Cleaning</Link></li>
              <li><Link href="/services/electrical-testing">Electrical Testing</Link></li>
              <li><Link href="/services/general-maintenance">General Maintenance</Link></li>
              <li><Link href="/services">All Services</Link></li>
            </ul>
          </div>
          
          <div className={styles.links}>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/areas">Areas We Cover</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className={styles.contact}>
            <h3>Contact</h3>
            <p>📞 <a href="tel:01727614464">01727 614464</a></p>
            <p>📱 <a href="tel:07956552477">07956 552 477</a></p>
            <p>📧 <a href="mailto:info@ccbgroupuk.com">info@ccbgroupuk.com</a></p>
            <p>401 St Albans Road West, St Albans, AL10 9RU</p>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} CCB Group (UK) Limited | VAT Reg: 489 3461 43</p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
