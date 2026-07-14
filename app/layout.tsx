import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { GOOGLE_SITE_VERIFICATION } from "@/lib/site";
import type { Metadata } from "next";
import { Oswald, Rubik } from "next/font/google";
import "./globals.css";
import "./glint-theme.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
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
      <body className={`${rubik.variable} ${oswald.variable} font-body`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10002] focus:rounded-sm focus:bg-gold focus:px-5 focus:py-3 focus:font-bold focus:text-bg"
        >
          Skip to main content
        </a>
        {children}
        <StickyWhatsApp />
      </body>
    </html>
  );
}
