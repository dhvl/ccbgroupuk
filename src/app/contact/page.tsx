import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function ContactPage() {
  return (
    <main>
      <Header />
      <Hero 
        title="Contact Us"
        subtitle="Get a free, no-obligation quote for your property maintenance needs."
        backgroundImage="/images/hero-roofing.png"
      />
      <section className="section-padding">
        <div className="container">
          <h2>Get In Touch</h2>
          <p>Unit 5, Executive Park, Hatfield Rd, St Albans AL1 4TA</p>
          <p>Email: info@ccbgroup.co.uk</p>
          <p>Phone: 01727 614464</p>
        </div>
      </section>
    </main>
  );
}
