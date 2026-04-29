import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import InquiryForm from '@/components/InquiryForm';
import { services } from '@/data/services';
import Link from 'next/link';
import Image from 'next/image';
import styles from './service-detail.module.css';
import { CheckCircle } from 'lucide-react';
import ServiceSidebar from './ServiceSidebar';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find(s => s.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.title} | CCB Group UK Ltd`,
    description: service.shortDesc,
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: Props) {
  const service = services.find(s => s.slug === params.slug);
  if (!service) notFound();

  const otherServices = services.filter(s => s.slug !== params.slug).slice(0, 6);

  return (
    <main>
      <Header />
      <div className={styles.compactHero}>
        <div className="container">
          <h1>{service.title}</h1>
        </div>
      </div>
      <Breadcrumbs />

      <section className="section-padding">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.mainContent}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  className={styles.mainImage}
                />
              </div>
              <div className={styles.text}>
                <h2>Overview</h2>
                <p className={styles.description}>{service.fullDesc}</p>
                
                <div className={styles.features}>
                  <h3>What We Offer</h3>
                  <div className={styles.featureGrid}>
                    {service.features.map((feature, i) => (
                      <div key={i} className={styles.featureItem}>
                        <CheckCircle size={20} className={styles.icon} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ServiceSidebar otherServices={otherServices} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
