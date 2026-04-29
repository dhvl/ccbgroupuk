import type { Metadata } from "next";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";

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
        <FloatingActions />
      </body>
    </html>
  );
}
