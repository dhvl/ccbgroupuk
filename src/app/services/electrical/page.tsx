import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function ElectricalPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Electrical Services"
        subtitle="NICEIC approved electrical installations, testing, and 24/7 emergency repairs."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Safe & Reliable Electrical Solutions</h2>
          <p>Our qualified electricians handle everything from domestic rewiring to large-scale commercial installations.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
