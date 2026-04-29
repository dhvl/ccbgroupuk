"use client";

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Footer from '@/components/Footer';
import { useModal } from '@/components/ModalContext';
import styles from './page.module.css';
import { Shield, Zap, Home, Droplets, MapPin, Phone } from 'lucide-react';

export default function Home() {
  const { openModal } = useModal();
  
  const services = [
    {
      title: 'Gutter Cleaning',
      desc: 'Professional gutter clearing and repairs for residential and commercial properties using high-reach vacuum technology.',
      icon: <Droplets size={40} />,
      link: '/gutter-cleaning'
    },
    {
      title: 'Electrical Services',
      desc: 'NICEIC approved electrical installations, testing, and emergency repairs across London.',
      icon: <Zap size={40} />,
      link: '/services/electrical'
    },
    {
      title: 'Roofing Repairs',
      desc: 'Expert roofing services from minor leak repairs to full roof replacements and surveys.',
      icon: <Home size={40} />,
      link: '/services/roofing'
    }
  ];

  return (
    <main>
      <Header />
      
      <Hero 
        title="London's Premier Property Maintenance Specialists"
        subtitle="Professional gutter cleaning, electrical, and roofing services for domestic and commercial clients since 2010."
        backgroundImage="/images/hero-roofing.png"
      />

      <TrustBar />

      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Our Specialist Services</h2>
            <p>From one-off gutter cleans to long-term commercial maintenance contracts.</p>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link href={service.link} className={styles.serviceLink}>Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.whyChoose} section-padding`}>
        <div className="container">
          <div className={styles.split}>
            <div className={styles.content}>
              <h2>Why CCB Group?</h2>
              <ul className={styles.list}>
                <li>
                  <Shield className={styles.check} />
                  <div>
                    <strong>Fully Insured & Accredited</strong>
                    <p>We are CHAS and NICEIC accredited with £10m public liability insurance.</p>
                  </div>
                </li>
                <li>
                  <MapPin className={styles.check} />
                  <div>
                    <strong>London & Home Counties</strong>
                    <p>Local teams based in St Albans and High Wycombe covering the entire M25 area.</p>
                  </div>
                </li>
                <li>
                  <Phone className={styles.check} />
                  <div>
                    <strong>24/7 Emergency Support</strong>
                    <p>Reliable emergency electrical and roofing support when you need it most.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.imageBox}>
              <div className={styles.placeholderImg} style={{ background: 'url(/images/ccb-van.png) center/cover no-repeat' }}>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gutterFeature}>
        <div className="container">
          <div className={styles.gutterGrid}>
            <div className={styles.gutterInfo}>
              <span className={styles.subBrand}>Introducing</span>
              <h2 className={styles.gutterTitle}>Gutter Cleaning Co.</h2>
              <p className={styles.gutterSubTitle}>Part of CCB Group (UK) Limited</p>
              <p className={styles.gutterDesc}>
                We clean all types and all heights of gutters using our <strong>Gutter Vacs Hoover System</strong> — with before and after camera footage on every clean.
              </p>
              <div className={styles.gutterActions}>
                <Link href="/gutter-cleaning" className="btn btn-primary">GUTTER CLEANING SERVICES →</Link>
                <p className={styles.discountText}>Discount on Multiple Blocks / Houses</p>
              </div>
            </div>
            <div className={styles.gutterImage}>
              <Image src="/images/media__1777465759335.png" alt="Gutter Cleaning" width={600} height={400} className={styles.roundedImg} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricingStrip}>
        <div className="container">
          <div className={styles.pricingFlex}>
            <span>Call-outs from <strong>£60.00 + VAT</strong> — Subject to area and trade</span>
            <button onClick={openModal} className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
              REQUEST A CALL-OUT
            </button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Areas We Cover</h2>
            <p>Reliable maintenance services across London and the surrounding Home Counties.</p>
          </div>
          <div className={styles.areasGrid}>
            <div className={styles.areaCard}>
              <h3>North London</h3>
              <p>✔ Full Coverage</p>
            </div>
            <div className={styles.areaCard}>
              <h3>East London</h3>
              <p>✔ Full Coverage</p>
            </div>
            <div className={styles.areaCard}>
              <h3>Hertfordshire</h3>
              <p>✔ Full Coverage</p>
            </div>
            <div className={styles.areaCard}>
              <h3>Bedfordshire</h3>
              <p>✔ Full Coverage</p>
            </div>
            <div className={styles.areaCard}>
              <h3>Essex</h3>
              <p>✔ Full Coverage</p>
            </div>
            <div className={styles.areaCard}>
              <h3>South London</h3>
              <p>⚡ Limited Coverage</p>
            </div>
          </div>
          <div className={styles.mapLinkBox}>
            <Link href="/areas" className={styles.mapLink}>View Full Coverage Map →</Link>
          </div>
        </div>
      </section>

      <section className={`${styles.testimonials} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What Our Clients Say</h2>
          </div>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"Excellent service. The gutter cleaning was thorough, and the before/after photos gave me real peace of mind."</p>
              <span className={styles.author}>— David R., St Albans</span>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"Very professional team. They handled our commercial electrical testing across 5 sites with zero fuss."</p>
              <span className={styles.author}>— Sarah L., London</span>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"Fast response to our emergency roofing leak. Competitive pricing and high-quality repair."</p>
              <span className={styles.author}>— James M., Watford</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaFlex}>
            <h2>Ready to book? Get in touch today.</h2>
            <button onClick={openModal} className="btn btn-primary" style={{ background: 'var(--accent-red)' }}>
              SEND US A MESSAGE →
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
