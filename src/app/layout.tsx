import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CCB Group UK Ltd | Property Maintenance & Gutter Cleaning London",
  description: "London's trusted property maintenance experts. Electrical, Roofing, Gutter Cleaning, and Refurbishment services across London and the Home Counties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <a 
          href="https://wa.me/447956552477" 
          className="whatsapp-float" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Chat with us on WhatsApp"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
        </a>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
          id="backToTop"
          title="Back to Top"
        >
          ↑
        </button>
        <script dangerouslySetInnerHTML={{ __html: `
          window.onscroll = function() {
            var btn = document.getElementById("backToTop");
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
              btn.style.display = "flex";
            } else {
              btn.style.display = "none";
            }
          };
        ` }} />
      </body>
    </html>
  );
}
