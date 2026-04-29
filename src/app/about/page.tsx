import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | CCB Group UK Ltd",
  description: "Learn about London's leading property maintenance specialist. Our values, accreditations, and commitment to quality.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import styles from './about.module.css';
import { CheckCircle, Shield, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="About CCB Group"
        subtitle="Reliability, Quality, and Transparency in Property Maintenance."
        backgroundImage="/images/hero-roofing.png"
      />
      
      <section className="section-padding">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.text}>
              <h2>London's Trusted Maintenance Partner</h2>
              <p>CCB Group (UK) Limited is a specialist property maintenance and facilities management company serving residential and commercial clients across London and the Home Counties.</p>
              <p>Founded on the principles of reliability, quality, and transparency, we provide a comprehensive range of building services — from reactive emergency repairs to large-scale planned refurbishments.</p>
              <p>Our team of multi-skilled tradespeople are fully accredited, insured, and committed to delivering excellence on every project. Whether you are a homeowner, a property manager, or a commercial estate owner, CCB Group is your trusted partner for all maintenance needs.</p>
            </div>
            <div className={styles.imagePlaceholder}>
              {/* Branding Image would go here */}
              <div className={styles.brandingBox}>
                <Award size={48} />
                <h3>15+ Years Experience</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.values} section-padding`}>
        <div className="container">
          <h2 className="text-center">Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <CheckCircle className={styles.valueIcon} />
              <h3>Reliability</h3>
              <p>We show up on time, every time. You can count on us for emergency call-outs and scheduled works alike.</p>
            </div>
            <div className={styles.valueItem}>
              <Shield className={styles.valueIcon} />
              <h3>Quality Craftsmanship</h3>
              <p>We don't cut corners. Our work is carried out to the highest industry standards by qualified professionals.</p>
            </div>
            <div className={styles.valueItem}>
              <Award className={styles.valueIcon} />
              <h3>Transparent Pricing</h3>
              <p>No hidden fees. We provide clear, itemized quotes so you know exactly what you're paying for.</p>
            </div>
            <div className={styles.valueItem}>
              <Users className={styles.valueIcon} />
              <h3>Customer-First</h3>
              <p>We build long-term relationships based on trust and communication. Your satisfaction is our priority.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container text-center">
          <h2>Fully Accredited & Insured</h2>
          <p className="mb-40">For your peace of mind, we hold the industry's most recognized accreditations.</p>
          <div className={styles.accreditationLogos}>
            <img src="/images/logo-trustmark.webp" alt="TrustMark" />
            <img src="/images/logo-chas.webp" alt="CHAS" />
            <img src="/images/logo-niceic.png" alt="NICEIC" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
