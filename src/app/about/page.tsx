import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | CCB Group UK Ltd",
  description: "Learn about London's leading property maintenance specialist. Our values, accreditations, and commitment to quality.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
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
      <Breadcrumbs />
      
      <section className="section-padding">
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.text}>
              <h2>London's Trusted Maintenance Partner</h2>
              <p>CCB Group (UK) Limited is a specialist, family-run property maintenance and facilities management company serving residential and commercial clients across London and the Home Counties.</p>
              <p>Founded on the principles of reliability, quality, and transparency, we provide a comprehensive range of building services — from reactive emergency repairs to large-scale planned refurbishments.</p>
              <p>As a family business, we take personal pride in every project, building long-term relationships through trust and exceptional craftsmanship. Our team of multi-skilled tradespeople are fully accredited, insured, and committed to delivering excellence on every job.</p>
            </div>
            <div className={styles.imagePlaceholder}>
              {/* Branding Image with Blur Effect */}
              <div className={styles.brandingBox}>
                <div className={styles.familyPill}>FAMILY RUN BUSINESS</div>
                <Award size={48} />
                <h3>15+ Years Experience</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.calloutSection}>
        <div className="container">
          <div className={styles.familyCallout}>
            <div>
              <h3>A Family Business Built on Reputation</h3>
              <p>
                CCB Group was founded and is still run by the same family today. Every job carries our name — which means every job matters to us personally. When you call us, you speak to a decision-maker with a reputation to protect.
              </p>
            </div>
            <blockquote className={styles.pullQuote}>
              "We started this business to do things properly. That hasn't changed."
              <cite style={{ display: 'block', fontStyle: 'normal', fontWeight: '700', marginTop: '15px', fontSize: '0.9rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '1px' }}>— The CCB Team</cite>
            </blockquote>
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
          <div className={styles.accreditationBox}>
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
