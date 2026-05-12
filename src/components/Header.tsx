"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useModal } from './ModalContext';
import { services } from '@/data/services';
import { Menu, X, ChevronDown, Phone, MessageSquare, Quote } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
          setIsMenuOpen(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const { openModal } = useModal();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className={`${styles.headerWrapper} ${!isVisible ? styles.hidden : ''}`}>
        <div className={styles.emergencyBanner}>
          <span>Emergency: 📱 <a href="tel:07956552477">07956 552 477</a> | Electrical: 📱 <a href="tel:07427298805">07427 298 805</a></span>
        </div>
        <header className={styles.header}>
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
              <Link href="/areas">Areas We Cover</Link>
              <Link href="/about">About Us</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>
            
            <div className={styles.cta}>
              <button 
                onClick={openModal} 
                className="btn btn-primary"
              >
                GET A QUOTE
              </button>
            </div>

            <button className={styles.mobileToggle} onClick={toggleMenu}>
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <div className={styles.mobileNav}>
              <Link href="/" onClick={toggleMenu}>Home</Link>
              <div className={styles.mobileDropdown}>
                <button 
                  className={styles.mobileDropdownToggle}
                  onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                >
                  Services <ChevronDown size={20} className={activeDropdown === 'services' ? styles.rotate : ''} />
                </button>
                <div className={`${styles.mobileDropdownContent} ${activeDropdown === 'services' ? styles.show : ''}`}>
                  {services.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} onClick={toggleMenu}>
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/gutter-cleaning" onClick={toggleMenu}>Gutter Cleaning</Link>
              <Link href="/areas" onClick={toggleMenu}>Areas We Cover</Link>
              <Link href="/about" onClick={toggleMenu}>About Us</Link>
              <Link href="/gallery" onClick={toggleMenu}>Gallery</Link>
              <Link href="/contact" onClick={toggleMenu}>Contact Us</Link>
              <div className={styles.mobileCta}>
                <button onClick={() => { openModal(); toggleMenu(); }} className="btn btn-primary w-full">GET A QUOTE</button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Bottom Sticky Nav */}
      <BottomNav />
    </>
  );
};

const BottomNav = () => {
  const [showBottom, setShowBottom] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;
      setShowBottom(scrollPercent > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.bottomNav} ${showBottom ? styles.bottomNavVisible : ''}`}>
      <Link href="/services" className={styles.bottomNavItem}>
        <div className={styles.bottomIcon}><Quote size={20} /></div>
        <span>Services</span>
      </Link>
      <button onClick={openModal} className={styles.bottomNavItem}>
        <div className={styles.bottomIcon}><Quote size={20} /></div>
        <span>Free Quote</span>
      </button>
      <a href="https://wa.me/447956552477" target="_blank" rel="noopener noreferrer" className={styles.bottomNavItem}>
        <div className={styles.bottomIcon}><MessageSquare size={20} /></div>
        <span>WhatsApp</span>
      </a>
    </div>
  );
};

export default Header;
