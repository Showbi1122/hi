import { CustomCursor } from "@/components/ui/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { GOOGLE_SITE_VERIFICATION } from "@/lib/site";
import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taleeb-shahbaz.vercel.app"),
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
    ],
    apple: [{ url: "/apple-touch-icon.webp", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <noscript>
          <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${inter.variable} ${sora.variable} font-body`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10002] focus:rounded-lg focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-bg"
        >
          Skip to main content
        </a>
        {children}
        <StickyWhatsApp />
        <CustomCursor />
      </body>
    </html>
  );
}
