import type {Metadata} from "next";
import {DM_Sans, Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import {Hero} from "./components/Hero";
import {Footer} from "./components/Footer";
import {Chatbot} from "./components/chatBot";
import {StructuredData} from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wędkowanie-ludwin.pl"
  ),
  title: {
    default: "Łowisko Ludwin – Stawy EKO-TORF Ludwinek, Wędkowanie",
    template: "%s | Łowisko Ludwinek",
  },
  description:
    "Łowisko Ludwin – trzy stawy (zbiorniki) EKO-TORF Ludwinek. Zarybione łowisko, NO KILL, strefy piknikowe. Wędkowanie i wypoczynek w Ludwinie, Lubelszczyzna.",
  keywords: [
    "łowisko Ludwin",
    "stawy Ludwin",
    "łowisko",
    "stawy",
    "wędkowanie",
    "Ludwin",
    "Lubelszczyzna",
    "EKO-TORF",
    "NO KILL",
    "łowisko ryb",
    "wędkarstwo",
    "zbiorniki",
    "karp",
    "szczupak",
    "sandacz",
    "Ludwinek",
  ],
  authors: [{name: "Łowisko EKO-TORF Ludwinek"}],
  creator: "Łowisko EKO-TORF Ludwinek",
  publisher: "Łowisko EKO-TORF Ludwinek",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Łowisko EKO-TORF Ludwinek",
    title: "Łowisko Ludwin – Stawy EKO-TORF Ludwinek, Wędkowanie",
    description:
      "Łowisko Ludwin – trzy stawy, zasada NO KILL, strefy piknikowe. Wędkowanie i wypoczynek w Ludwinie na Lubelszczyźnie.",
    images: [
      {
        url: "/images/header-ludwinek-1600.webp",
        width: 1600,
        height: 900,
        alt: "Łowisko EKO-TORF Ludwinek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Łowisko Ludwin – Stawy EKO-TORF Ludwinek, Wędkowanie",
    description:
      "Łowisko Ludwin – trzy stawy, NO KILL, wędkowanie i wypoczynek w Ludwinie.",
    images: ["/images/header-ludwinek-1600.webp"],
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
  icons: {
    icon: "/faviconWO.ico",
    apple: "/faviconWO.ico",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className={`${inter.variable} ${dmSans.variable}`}>
        <StructuredData />
        <header>
          <Hero />
        </header>
        <main>
          {children}
          <Chatbot />
        </main>
        <Footer />
      </body>
    </html>
  );
}
