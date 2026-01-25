import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Fotorelacje",
  description:
    "Fotorelacje z łowiska EKO-TORF Ludwinek. Zobacz zdjęcia z wędkowania, rekordowe okazy i relacje z turniejów wędkarskich.",
  keywords: [
    "fotorelacje",
    "zdjęcia",
    "łowisko",
    "wędkowanie",
    "Ludwinek",
    "galeria",
    "turnieje",
  ],
  openGraph: {
    title: "Fotorelacje - Łowisko EKO-TORF Ludwinek",
    description:
      "Zobacz zdjęcia z wędkowania, rekordowe okazy i relacje z turniejów wędkarskich w Ludwinku.",
    url: "/relations",
    type: "website",
  },
  alternates: {
    canonical: "/relations",
  },
};

export default function RelationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
