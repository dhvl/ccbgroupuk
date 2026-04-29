import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Our Services"
        subtitle="Comprehensive property maintenance solutions including Gutter Cleaning, Electrical, and Roofing."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Specialist Maintenance Solutions</h2>
          <p>We provide a wide range of services for residential and commercial properties.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
