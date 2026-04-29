import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={styles.emergencyBanner}>
        <span>Emergency call-outs available: 📱 <a href="tel:07956552477">07956 552 477</a></span>
      </div>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.container} container`}>
          <div className={styles.logo}>
            <Link href="/">
              <span className={styles.logoText}>CCB GROUP</span>
            </Link>
          </div>
          
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/gutter-cleaning">Gutter Cleaning</Link>
            <Link href="/areas">Areas</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          
          <div className={styles.cta}>
            <Link href="/contact" className={`btn ${isScrolled ? 'btn-outline' : 'btn-primary'}`} style={isScrolled ? { borderColor: 'white', color: 'white' } : {}}>
              GET A QUOTE
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
