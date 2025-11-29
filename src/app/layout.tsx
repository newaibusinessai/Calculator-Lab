import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://calculatorlab.org"),
  title: {
    default: "Calculator Lab - Free Online Calculators",
    template: "%s | Calculator Lab",
  },
  description:
    "Free online calculators for math, finance, fitness, health and more. Easy to use calculator tools for everyday calculations.",
  keywords: [
    "calculator",
    "online calculator",
    "math calculator",
    "financial calculator",
    "BMI calculator",
    "loan calculator",
    "mortgage calculator",
    "percentage calculator",
    "scientific calculator",
    "tax calculator",
  ],
  authors: [{ name: "Calculator Lab" }],
  creator: "Calculator Lab",
  publisher: "Calculator Lab",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://calculatorlab.org",
    languages: {
      "en-US": "https://calculatorlab.org",
      "x-default": "https://calculatorlab.org",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://calculatorlab.org",
    siteName: "Calculator Lab",
    title: "Calculator Lab - Free Online Calculators",
    description:
      "Free online calculators for math, finance, fitness, health and more. Easy to use calculator tools for everyday calculations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calculator Lab - Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator Lab - Free Online Calculators",
    description:
      "Free online calculators for math, finance, fitness, health and more.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <meta name="theme-color" content="#2563eb" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
