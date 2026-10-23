import React from "react";
import { Jost } from "next/font/google";
import "@/styles/globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ayurrakshaonline.com"),
  title: {
    default: "AyurRaksha Online — Premium Headless Ayurvedic E-Commerce",
    template: "%s | AyurRaksha",
  },
  description: "Authentic, doctor-formulated Ayurvedic health remedies, herbal supplements, and natural wellness products.",
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${jost.variable}`}>
      <body className={`${jost.className} bg-ayur-cream text-ayur-slate font-sans antialiased min-h-screen flex flex-col`}>
        <AnnouncementBar />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
