import Header from '@/components/Header';
import CompactHero from '@/components/CompactHero';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './faqs.module.css';

export default function FAQsPage() {
  const faqs = [
    {
      q: "What areas do you cover?",
      a: "We cover North London, East London, South London, Hertfordshire, Bedfordshire, and Essex. Our coverage continues to expand — please contact us for specific availability in your area."
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
      a: "Yes. Our VAT Registration Number is 489 3461 43."
    },
    {
      q: "How much do your services cost?",
      a: "Our pricing varies depending on the location, size of the property, and the specific trade required. Please contact us for a free, no-obligation instant quote tailored to your needs."
    }
  ];

  return (
    <main>
      <Header />
      <CompactHero title="Frequently Asked Questions" />
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
            <div className={styles.ctaInner}>
              <h3>Still have questions?</h3>
              <p>Our team is here to help. Give us a call or send a message for an instant quote.</p>
              <a href="/contact" className="btn btn-primary" style={{ background: 'var(--white)', color: 'var(--primary-navy)', padding: '15px 40px' }}>
                CONTACT US TODAY
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
