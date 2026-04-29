import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function RoofingPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Roofing Repairs & Maintenance"
        subtitle="Expert roofing services for leaks, tile replacements, and full roof surveys."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Expert Roofing Solutions</h2>
          <p>We provide comprehensive roofing repairs and maintenance to keep your property watertight and secure.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
