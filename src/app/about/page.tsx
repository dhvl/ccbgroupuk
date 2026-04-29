import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="About CCB Group"
        subtitle="Serving London and the Home Counties with premium property maintenance since 2010."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Our Story</h2>
          <p>CCB Group is a family-run business dedicated to providing high-quality facility management and property maintenance services.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
