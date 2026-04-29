import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import styles from './page.module.css';
import { Shield, Zap, Home as House, Droplets, MapPin, Phone } from 'lucide-react';

export default function Home() {
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
      icon: <House size={40} />,
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
                <a href={service.link} className={styles.serviceLink}>Learn More →</a>
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
              <div className={styles.placeholderImg}>
                {/* Image of a CCB Group van or team member would go here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaFlex}>
            <h2>Ready to start your project?</h2>
            <button className="btn btn-primary" style={{ background: 'var(--accent-red)' }}>
              GET AN INSTANT QUOTE
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div>
              <h3 style={{ color: 'white' }}>CCB Group UK Ltd</h3>
              <p>Specialist Property Maintenance & Facilities Management.</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/gutter-cleaning">Gutter Cleaning</a></li>
                <li><a href="/services/electrical">Electrical</a></li>
                <li><a href="/services/roofing">Roofing</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <p>Unit 5, Executive Park, Hatfield Rd, St Albans AL1 4TA</p>
              <p>Email: info@ccbgroup.co.uk</p>
              <p>Phone: 01727 614464</p>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} CCB Group UK Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
