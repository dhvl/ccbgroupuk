"use client";

import { useModal } from './ModalContext';
import styles from './Hero.module.css';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Hero = ({ title, subtitle, backgroundImage }: HeroProps) => {
  const { openModal } = useModal();

  return (
    <section 
      className={styles.hero} 
      style={{ backgroundImage: `linear-gradient(rgba(30, 42, 110, 0.7), rgba(30, 42, 110, 0.7)), url(${backgroundImage})` }}
    >
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <button onClick={openModal} className="btn btn-primary">GET A FREE QUOTE</button>
            <a href="tel:01727614464" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary-navy)', border: '2px solid white' }}>
              CALL 01727 614464
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

