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
    default: "Łowisko EKO-TORF Ludwinek - Wędkowanie i Relaks",
    template: "%s | Łowisko Ludwinek",
  },
  description:
    "Łowisko Ludwinek EKO-TORF to wyjątkowe miejsce na terenie dawnej kopalni torfu. Trzy starannie zarybione zbiorniki, zasada NO KILL, strefy piknikowe. Idealne miejsce na wędkowanie i wypoczynek z rodziną w Ludwinie.",
  keywords: [
    "łowisko",
    "wędkowanie",
    "Ludwin",
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
    title: "Łowisko EKO-TORF Ludwinek - Wędkowanie i Relaks",
    description:
      "Wyjątkowe miejsce na wędkowanie i wypoczynek. Trzy zarybione zbiorniki, zasada NO KILL, strefy piknikowe. Zapraszamy do Ludwina!",
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
    title: "Łowisko EKO-TORF Ludwinek - Wędkowanie i Relaks",
    description:
      "Wyjątkowe miejsce na wędkowanie i wypoczynek. Trzy zarybione zbiorniki, zasada NO KILL.",
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
