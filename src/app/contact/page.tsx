import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact CCB Group | Get a Free Quote",
  description: "Contact us for all property maintenance inquiries and 24/7 emergency call-outs in London and Home Counties.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import styles from './contact.module.css';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Contact Us"
        subtitle="Professional property maintenance solutions across London and the Home Counties."
        backgroundImage="/images/hero-roofing.png"
      />
      <Breadcrumbs />
      
      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.contactInfo}>
              <h2>Get in Touch</h2>
              <p className={styles.intro}>Have a maintenance requirement or an emergency? Our team is ready to help.</p>
              
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <Phone className={styles.icon} />
                  <div>
                    <h3>Call Us</h3>
                    <p><a href="tel:01727614464">01727 614464</a> (Office)</p>
                    <p><a href="tel:07956552477">07956 552 477</a> (Emergency)</p>
                    <p><a href="tel:07427298805">07427 298 805</a> (Electrical)</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <Mail className={styles.icon} />
                  <div>
                    <h3>Email Us</h3>
                    <p><a href="mailto:info@ccbgroupuk.com">info@ccbgroupuk.com</a></p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <MapPin className={styles.icon} />
                  <div>
                    <h3>Visit Us</h3>
                    <p>401 St Albans Road West, St Albans, AL10 9RU</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <Clock className={styles.icon} />
                  <div>
                    <h3>Opening Hours</h3>
                    <p>Mon - Fri: 08:00 - 18:00</p>
                    <p>24/7 Emergency Call-outs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formWrapper}>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
