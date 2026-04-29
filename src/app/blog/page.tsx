import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Image from 'next/image';
import styles from './blog.module.css';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "How often should you clean your gutters?",
      excerpt: "Blocked gutters can cause serious damp and structural damage. Learn how to identify when yours need attention.",
      date: "April 15, 2026",
      image: "/images/media__1777465759335.png"
    },
    {
      id: 2,
      title: "What is an EICR and does my property need one?",
      excerpt: "An Electrical Installation Condition Report is vital for safety. We explain the legal requirements for landlords and homeowners.",
      date: "April 10, 2026",
      image: "/images/services/electrical-testing.png"
    },
    {
      id: 3,
      title: "Signs your roof needs urgent repair",
      excerpt: "Don't wait for a leak to become a flood. Check out these key signs that your roof needs a professional inspection.",
      date: "April 5, 2026",
      image: "/images/services/roofing.png"
    }
  ];

  return (
    <main>
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>News & Insights</h1>
        </div>
      </div>
      <Breadcrumbs />

      <section className="section-padding">
        <div className="container">
          <div className={styles.blogGrid}>
            {posts.map(post => (
              <article key={post.id} className={styles.blogCard}>
                <div className={styles.imageBox}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={styles.content}>
                  <span className={styles.date}>{post.date}</span>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <a href="#" className={styles.readMore}>Read More →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
