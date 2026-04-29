import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact CCB Group | Get a Free Quote",
  description: "Contact us for all property maintenance inquiries and 24/7 emergency call-outs in London and Home Counties.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
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
                    <p>Unit 5, Executive Park, Hatfield Rd, St Albans AL1 4TA</p>
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
              <form className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Your Name*</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email Address*</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Phone Number*</label>
                    <input type="tel" placeholder="07123 456 789" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Postcode*</label>
                    <input type="text" placeholder="AL1 4TA" required />
                  </div>
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Service Required*</label>
                  <select required>
                    <option value="">Select a service...</option>
                    <option value="electrical">Electrical</option>
                    <option value="gutters">Gutter Cleaning/Repairs</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="roofing">Roofing</option>
                    <option value="general">General Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className={styles.inputGroup}>
                  <label>Your Message*</label>
                  <textarea placeholder="Please describe your requirements..." rows={5} required></textarea>
                </div>

                {/* Honeypot Field */}
                <div style={{ display: 'none' }}>
                  <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>SEND ENQUIRY</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
