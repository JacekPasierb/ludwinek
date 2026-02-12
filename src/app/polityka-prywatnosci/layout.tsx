import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności serwisu Łowisko EKO-TORF Ludwinek – informacje o przetwarzaniu danych i publikacji zdjęć za zgodą.",
  alternates: {
    canonical: "/polityka-prywatnosci",
  },
  openGraph: {
    title: "Polityka prywatności - Łowisko EKO-TORF Ludwinek",
    description:
      "Informacje o przetwarzaniu danych i publikacji zdjęć w galerii za zgodą.",
    url: "/polityka-prywatnosci",
    type: "website",
  },
  robots: {
    index: false, 
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
