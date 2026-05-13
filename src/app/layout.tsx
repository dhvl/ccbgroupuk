import type { Metadata } from "next";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";

export const metadata: Metadata = {
  title: "CCB Group UK Ltd | Property Maintenance & Gutter Cleaning London",
  description: "London's trusted experts in Property Maintenance, Electrical Services, and Gutter Cleaning. Serving residential and commercial clients across London and the Home Counties.",
};

import { ModalProvider } from "@/components/ModalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ModalProvider>
          {children}
          <FloatingActions />
        </ModalProvider>
      </body>
    </html>
  );
}
