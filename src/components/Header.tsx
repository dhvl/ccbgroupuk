import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <div className={styles.logo}>
          <Link href="/">
            <span className={styles.logoText}>CCB GROUP</span>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <div className={styles.dropdown}>
            <Link href="/services">Services</Link>
          </div>
          <Link href="/gutter-cleaning">Gutter Cleaning</Link>
          <Link href="/areas">Areas</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        
        <div className={styles.cta}>
          <Link href="/contact" className="btn btn-primary">
            GET A QUOTE
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
