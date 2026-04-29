"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import styles from './gallery.module.css';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Electrical', 'Gutters', 'Roofing', 'Refurbishment', 'Maintenance'];

  const projects = [
    { id: 1, title: 'EICR Inspection', category: 'Electrical', image: '/images/services/electrical-testing.png' },
    { id: 2, title: 'High-Reach Gutter Clearing', category: 'Gutters', image: '/images/media__1777465759335.png' },
    { id: 3, title: 'Roof Repair St Albans', category: 'Roofing', image: '/images/services/roofing.png' },
    { id: 4, title: 'Kitchen Refurbishment', category: 'Refurbishment', image: '/images/services/refurbishment.png' },
    { id: 5, title: 'External Decorating', category: 'Maintenance', image: '/images/services/decorating.png' },
    { id: 6, title: 'Full Carpentry Fit-out', category: 'Maintenance', image: '/images/services/carpentry.png' },
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <main>
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>Our Work</h1>
        </div>
      </div>
      <Breadcrumbs />

      <section className="section-padding">
        <div className="container">
          <div className={styles.filterBar}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.galleryGrid}>
            {filteredProjects.map(project => (
              <div key={project.id} className={styles.galleryItem}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.overlay}>
                    <h3>{project.title}</h3>
                    <span>{project.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
