import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Property Maintenance Services London | CCB Group UK",
  description: "Explore our full range of maintenance services including Electrical, Roofing, Carpentry, and more.",
};

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { 
  Wrench, Zap, Droplets, Home, Hammer, Shield, 
  Eye, Paintbrush, Layers, Bath, PenTool, ClipboardCheck, 
  Construction, Ruler 
} from 'lucide-react';
import styles from './services.module.css';

const services = [
  {
    title: "General Maintenance",
    description: "Reactive and planned maintenance for residential and commercial properties.",
    icon: Wrench,
    href: "/services/general-maintenance"
  },
  {
    title: "Electrical Testing",
    description: "NICEIC approved periodic inspection and testing (EICR certificates).",
    icon: Zap,
    href: "/services/electrical-testing"
  },
  {
    title: "Electrical Maintenance",
    description: "Full electrical maintenance, fault finding, and installation works.",
    icon: Shield,
    href: "/services/electrical-maintenance"
  },
  {
    title: "Gutter Repairs & Clearances",
    description: "Gutter vac cleaning, camera inspection, and gutter repairs at all heights.",
    icon: Droplets,
    href: "/gutter-cleaning"
  },
  {
    title: "Carpentry",
    description: "Doors, frames, skirting, fitted furniture, and bespoke joinery.",
    icon: Hammer,
    href: "/services/carpentry"
  },
  {
    title: "Roofing Works",
    description: "Flat and pitched roofing, repairs, felt work, and emergency call-outs.",
    icon: Home,
    href: "/services/roofing"
  },
  {
    title: "Site Inspections",
    description: "Professional property condition reports and site audits.",
    icon: Eye,
    href: "/services/site-inspections"
  },
  {
    title: "Refurbishment",
    description: "Full property refurbishment — kitchens, bathrooms, full fit-outs.",
    icon: Construction,
    href: "/services/refurbishment"
  },
  {
    title: "Decorating",
    description: "Interior and exterior painting and decorating.",
    icon: Paintbrush,
    href: "/services/decorating"
  },
  {
    title: "Plastering",
    description: "Skimming, dry-lining, artexing, and full plastering works.",
    icon: Layers,
    href: "/services/plastering"
  },
  {
    title: "Power Washing",
    description: "Driveway, patio, building facade, and fleet power washing.",
    icon: Droplets,
    href: "/services/power-washing"
  },
  {
    title: "Brick Work",
    description: "Repointing, new build brickwork, and repairs.",
    icon: Ruler,
    href: "/services/brick-work"
  },
  {
    title: "Plumbing",
    description: "General plumbing maintenance, leak repairs, and installations.",
    icon: Bath,
    href: "/services/plumbing"
  },
  {
    title: "Fencing",
    description: "Timber, metal, and composite fencing supply and installation.",
    icon: PenTool,
    href: "/services/fencing"
  }
];

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Our Services"
        subtitle="Specialist Property Maintenance & Facilities Management all under one roof."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <div className={styles.grid}>
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
