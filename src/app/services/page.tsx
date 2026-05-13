import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Property Maintenance Services London | CCB Group UK",
  description: "Explore our full range of maintenance services including Electrical, Roofing, Carpentry, and more.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ServiceCard from '@/components/ServiceCard';
import { 
  Wrench, Zap, Droplets, Home, Hammer, Shield, 
  Eye, Paintbrush, Layers, Bath, PenTool, ClipboardCheck, 
  Construction, Ruler 
} from 'lucide-react';
import styles from './services.module.css';

import { services } from '@/data/services';

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Our Services"
        subtitle="Specialist Property Maintenance & Facilities Management all under one roof."
        backgroundImage="/images/hero-roofing.png"
      />
      <Breadcrumbs />
      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            {/* 1. Property Maintenance & 2. Electrical */}
            {services.slice(0, 3).map((service, index) => (
              <ServiceCard 
                key={index} 
                title={service.title}
                description={service.shortDesc}
                icon={Wrench}
                href={`/services/${service.slug}`}
              />
            ))}

            {/* 3. Gutter Cleaning */}
            <ServiceCard 
              title="Gutter Repairs & Clearances"
              description="Gutter vac cleaning, camera inspection, and gutter repairs at all heights."
              icon={Droplets}
              href="/gutter-cleaning"
            />

            {/* The rest of the services */}
            {services.slice(3).map((service, index) => (
              <ServiceCard 
                key={index + 3} 
                title={service.title}
                description={service.shortDesc}
                icon={Wrench}
                href={`/services/${service.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
