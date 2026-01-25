import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Regulamin Łowiska",
  description:
    "Regulamin łowiska EKO-TORF Ludwinek. Zasady wędkowania, limity zabieranych ryb, zasada NO KILL, informacje o płatnościach i kontakcie.",
  keywords: [
    "regulamin",
    "łowisko",
    "zasady",
    "NO KILL",
    "limity",
    "wędkowanie",
    "Ludwinek",
    "EKO-TORF",
  ],
  openGraph: {
    title: "Regulamin Łowiska EKO-TORF Ludwinek",
    description:
      "Zasady wędkowania, limity zabieranych ryb, zasada NO KILL i informacje kontaktowe.",
    url: "/rules",
    type: "website",
  },
  alternates: {
    canonical: "/rules",
  },
};

export default function RulesLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
