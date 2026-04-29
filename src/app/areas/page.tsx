import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Areas Covered | CCB Group UK Ltd",
  description: "We cover Hertfordshire, Buckinghamshire, and London. See our full list of service areas.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPin } from 'lucide-react';
import styles from './areas.module.css';

const locations = [
  { region: "Hertfordshire", towns: ["St Albans", "Watford", "Hemel Hempstead", "Hatfield", "Harpenden", "Berkhamsted", "Radlett", "Borehamwood"] },
  { region: "Buckinghamshire", towns: ["High Wycombe", "Amersham", "Chesham", "Beaconsfield", "Gerrards Cross", "Marlow"] },
  { region: "London", towns: ["Barnet", "Enfield", "Harrow", "Ealing", "Hillingdon", "Brent", "Camden", "Islington"] },
];

export default function AreasPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Areas We Cover"
        subtitle="Professional property maintenance across Hertfordshire, Buckinghamshire, and London."
        backgroundImage="/images/hero-roofing.png"
      />
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            {locations.map((loc, i) => (
              <div key={i} className={styles.regionCard}>
                <div className={styles.regionHeader}>
                  <MapPin className={styles.icon} />
                  <h2>{loc.region}</h2>
                </div>
                <ul className={styles.townList}>
                  {loc.towns.map((town, j) => (
                    <li key={j}>{town}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className={styles.ctaBox}>
            <h3>Don't see your area?</h3>
            <p>We often travel further for larger projects. Contact us to discuss your requirements.</p>
            <a href="/contact" className="btn btn-primary">ENQUIRE NOW</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
