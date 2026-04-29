import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './faqs.module.css';

export default function FAQsPage() {
  const faqs = [
    {
      q: "What areas do you cover?",
      a: "We cover North London, East London, South London (limited), Hertfordshire, Bedfordshire, and Essex. Call-outs start from £60 + VAT depending on area and trade."
    },
    {
      q: "Are you accredited?",
      a: "Yes — we are TrustMark endorsed, CHAS accredited, and NICEIC approved."
    },
    {
      q: "Do you offer emergency call-outs?",
      a: "Yes. Contact us on 07956 552 477 or 07528 233611 for urgent works."
    },
    {
      q: "How does your gutter cleaning service work?",
      a: "We use a Gutter Vacs Hoover System operated from ground level. Cameras provide before and after photographic evidence on every single clean."
    },
    {
      q: "Do you offer planned maintenance contracts?",
      a: "Yes — for commercial clients, property managers, and landlords we offer scheduled planned maintenance agreements."
    },
    {
      q: "Can I get a discount for multiple properties?",
      a: "Absolutely. We offer discounts on multiple blocks or houses. Get in touch for a bespoke quote."
    },
    {
      q: "Are you VAT registered?",
      a: "Yes. Our VAT Registration Number is 284 6962 52."
    },
    {
      q: "What is your minimum call-out charge?",
      a: "Call-outs start from £60.00 + VAT, subject to area and trade."
    }
  ];

  return (
    <main>
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
        </div>
      </div>
      <Breadcrumbs />

      <section className="section-padding">
        <div className="container">
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.question}>{faq.q}</summary>
                <div className={styles.answer}>
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
          
          <div className={styles.ctaBox}>
            <h3>Still have questions?</h3>
            <p>Our team is here to help. Give us a call or send a message.</p>
            <a href="/contact" className="btn btn-primary">CONTACT US</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
