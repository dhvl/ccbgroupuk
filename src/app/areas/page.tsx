import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function AreasPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Areas We Cover"
        subtitle="Professional maintenance services across London, St Albans, High Wycombe, and the Home Counties."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Serving Your Local Area</h2>
          <p>We have local teams based strategically to cover the entire M25 region and surrounding counties.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
