import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function GutterCleaningPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Gutter Cleaning & Repairs"
        subtitle="Professional gutter clearing using high-reach vacuum technology for homes and businesses."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Keep Your Property Safe</h2>
          <p>Blocked gutters can cause serious damp and structural issues. Our expert team ensures your drainage system is clear and functional.</p>
        </div>
      </section>
    </main>
  );
}
