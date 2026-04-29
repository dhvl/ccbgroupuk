"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useModal } from './ModalContext';
import { services } from '@/data/services';
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

  const { openModal } = useModal();

  return (
    <>
      <div className={styles.emergencyBanner}>
        <span>Emergency call-outs available: 📱 <a href="tel:07956552477">07956 552 477</a></span>
      </div>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`${styles.container} container`}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src="/images/logo.webp" alt="CCB Group" width={180} height={50} priority style={{ width: 'auto', height: '50px' }} />
            </Link>
          </div>
          
          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <div className={styles.navItemWithDropdown}>
              <Link href="/services">Services <span className={styles.arrow}>▾</span></Link>
              <div className={styles.dropdown}>
                <div className={styles.dropdownGrid}>
                  {services.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className={styles.dropdownItem}>
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/gutter-cleaning">Gutter Cleaning</Link>
            <Link href="/areas">Areas</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          
          <div className={styles.cta}>
            <button 
              onClick={openModal} 
              className={`btn ${isScrolled ? 'btn-outline' : 'btn-primary'}`} 
              style={isScrolled ? { borderColor: 'white', color: 'white' } : {}}
            >
              GET A QUOTE
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
