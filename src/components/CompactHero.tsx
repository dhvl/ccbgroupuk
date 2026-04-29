"use client";

import styles from './CompactHero.module.css';

interface CompactHeroProps {
  title: string;
}

const CompactHero = ({ title }: CompactHeroProps) => {
  return (
    <section className={styles.compactHero}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
};

export default CompactHero;
