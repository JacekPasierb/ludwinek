"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";

const ALBUM_NAMES: Record<string, string> = {
  "zbiornik-1": "Zbiornik 1",
  "zbiornik-2": "Zbiornik 2",
  "zbiornik-3": "Zbiornik 3",
  wydarzenia: "Wydarzenia",
};

function getBreadcrumbItems(
  pathname: string,
  baseUrl: string
): Array<{"@type": string; position: number; name: string; item: string}> {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return [];

  if (pathname === "/rules")
    return [
      {
        "@type": "ListItem",
        position: 2,
        name: "Regulamin",
        item: `${baseUrl}/rules`,
      },
    ];

  if (pathname === "/relations")
    return [
      {
        "@type": "ListItem",
        position: 2,
        name: "Fotorelacje",
        item: `${baseUrl}/relations`,
      },
    ];

  if (parts[0] === "relations" && parts[1]) {
    const albumName = ALBUM_NAMES[parts[1]] || parts[1];
    return [
      {
        "@type": "ListItem",
        position: 2,
        name: "Fotorelacje",
        item: `${baseUrl}/relations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: albumName,
        item: `${baseUrl}${pathname}`,
      },
    ];
  }

  return [
    {
      "@type": "ListItem",
      position: 2,
      name: "Strona",
      item: `${baseUrl}${pathname}`,
    },
  ];
}

export const StructuredData = () => {
  const pathname = usePathname();

  useEffect(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://wędkowanie-ludwin.pl";

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "@id": `${baseUrl}#organization`,
      name: "Łowisko EKO-TORF Ludwinek",
      alternateName: [
        "Łowisko Ludwinek",
        "Łowisko Ludwin",
        "Stawy Ludwinek",
        "Stawy Ludwin",
        "Stawy EKO-TORF Ludwinek",
      ],
      description:
        "Łowisko Ludwin – trzy stawy (zbiorniki) EKO-TORF Ludwinek na terenie dawnej kopalni torfu. Zarybione łowisko, NO KILL, wędkowanie i wypoczynek w Ludwinie na Lubelszczyźnie.",
      url: baseUrl,
      logo: `${baseUrl}/images/logo-ludwinek.png`,
      image: `${baseUrl}/images/header-ludwinek-1600.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ludwin 1C",
        addressLocality: "Ludwin",
        addressCountry: "PL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "51.346944",
        longitude: "22.905833",
      },
      telephone: ["+48691911777", "+48609193579"],
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "16:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "08:00",
          closes: "14:00",
        },
      ],
      sameAs: ["https://www.facebook.com/lowiskoludwinek"],
      sport: "Fishing",
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "NO KILL",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Picnic Area",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Three Ponds",
          value: true,
        },
      ],
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}#website`,
      url: baseUrl,
      name: "Łowisko EKO-TORF Ludwinek",
      description: "Oficjalna strona łowiska EKO-TORF Ludwinek",
      publisher: {
        "@id": `${baseUrl}#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Strona główna",
          item: baseUrl,
        },
        ...(pathname !== "/" ? getBreadcrumbItems(pathname, baseUrl) : []),
      ],
    };

    // Usuń poprzednie skrypty structured data
    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    existingScripts.forEach((script) => script.remove());

    // Dodaj nowe skrypty
    const addScript = (schema: object, id: string) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addScript(localBusinessSchema, "local-business-schema");
    addScript(websiteSchema, "website-schema");
    addScript(breadcrumbSchema, "breadcrumb-schema");
  }, [pathname]);

  return null;
};
