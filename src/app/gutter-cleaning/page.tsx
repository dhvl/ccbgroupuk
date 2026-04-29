"use client";

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useModal } from '@/components/ModalContext';
import styles from './gutter.module.css';
import { Shield, Camera, Droplets, ArrowRight } from 'lucide-react';

export default function GutterCleaningPage() {
  const { openModal } = useModal();

  return (
    <main className={styles.gutterTheme}>
      <Header />
      <div className={styles.gutterBranding}>
        <div className="container">
          <span className={styles.subBrand}>A DIVISION OF CCB GROUP</span>
          <h1 className={styles.mainBrand}>GUTTER CLEANING CO.</h1>
        </div>
      </div>
      
      <Hero 
        title="Professional Gutter Clearing & Repairs"
        subtitle="Using high-reach vacuum technology and camera inspections for a perfect finish."
        backgroundImage="/images/hero-roofing.png"
      />
      <Breadcrumbs />
      
      <section className="section-padding">
        <div className="container">
          <div className={styles.introGrid}>
            <div>
              <h2>The Experts in Gutter Maintenance</h2>
              <p>Blocked gutters can cause serious damp, structural damage, and costly repairs. At Gutter Cleaning Co (a division of CCB Group), we provide professional, safe, and efficient gutter clearing services for residential and commercial properties.</p>
              <div className={styles.featureList}>
                <div className={styles.feature}>
                  <Shield size={24} />
                  <span>Fully Insured & Accredited</span>
                </div>
                <div className={styles.feature}>
                  <Camera size={24} />
                  <span>Before & After Photos Provided</span>
                </div>
                <div className={styles.feature}>
                  <Droplets size={24} />
                  <span>Minor Repairs Included as Standard</span>
                </div>
              </div>
            </div>
            <div className={styles.ctaCard}>
              <h3>Get an Instant Quote</h3>
              <p>Text a photo of your house to 07956 552 477 for a fast estimate!</p>
              <button onClick={openModal} className="btn btn-primary">ENQUIRE ONLINE <ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.process} section-padding`}>
        <div className="container">
          <h2 className="text-center">Our Process</h2>
          <div className={styles.processGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>01</div>
              <h3>Camera Inspection</h3>
              <p>We use high-reach cameras to inspect your gutters from the ground, identifying blocks and defects.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>02</div>
              <h3>Gutter Vac Clearing</h3>
              <p>Our powerful vacuum systems remove all debris, silt, and moss without the need for ladders or scaffolding.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>03</div>
              <h3>Testing & Verification</h3>
              <p>We flush the system with water to ensure downpipes are clear and provide you with a full report.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

