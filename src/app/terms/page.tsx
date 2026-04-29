import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TermsPage() {
  return (
    <main>
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>Terms & Conditions</h1>
        </div>
      </div>
      <Breadcrumbs />

      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            <p><strong>Last Updated: April 2026</strong></p>
            <p>By accessing and using this website, you agree to comply with the following terms and conditions.</p>
            
            <h2>1. Services</h2>
            <p>CCB Group (UK) Limited provides property maintenance and facilities management services. All quotes provided through the website are estimates and subject to site survey and formal agreement.</p>

            <h2>2. Intellectual Property</h2>
            <p>All content on this website, including text, logos, and images, is the property of CCB Group (UK) Limited and protected by copyright laws.</p>

            <h2>3. Limitation of Liability</h2>
            <p>We strive to ensure the information on this site is accurate, but we do not guarantee its completeness or accuracy. We are not liable for any losses arising from the use of this website.</p>

            <h2>4. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of England and Wales.</p>

            <h2>5. Contact Us</h2>
            <p>If you have any questions about these terms, please contact us at info@ccbgroupuk.com.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
