import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Hero} from "./components/Hero";
import {Footer} from "./components/Footer";
import {Chatbot} from "./components/chatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ludwinek",
  description: "Łowisko Ludwinek",
  icons: {
    icon: "/faviconWO.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
