import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <div className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
        </div>
      </div>
      <Breadcrumbs />

      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            <p><strong>Last Updated: April 2026</strong></p>
            <p>CCB Group (UK) Limited ("we", "our", or "us") is committed to protecting and respecting your privacy. This policy explains how we collect, use, and protect your personal data when you visit our website.</p>
            
            <h2>1. Information We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul>
              <li>Information you provide by filling in forms on our site (e.g., name, email, phone number).</li>
              <li>Information about your visit, including your IP address, browser type, and pages viewed.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide you with quotes and services you request.</li>
              <li>Communicate with you about your enquiries.</li>
              <li>Improve our website and services.</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>We do not sell your personal data to third parties. We may share your data with trusted partners (such as email service providers) strictly for the purpose of providing our services.</p>

            <h2>4. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Please contact us at info@ccbgroupuk.com for any requests.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
