"use client";

import {usePathname} from "next/navigation";
import {useEffect} from "react";

export const StructuredData = () => {
  const pathname = usePathname();

  useEffect(() => {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://lowiskoludwinek.pl";

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "@id": `${baseUrl}#organization`,
      name: "Łowisko EKO-TORF Ludwinek",
      alternateName: "Łowisko Ludwinek",
      description:
        "Łowisko Ludwinek EKO-TORF to wyjątkowe miejsce na terenie dawnej kopalni torfu, otoczone naturą i ciszą. Idealne zarówno na spokojne wędkowanie, jak i wypoczynek z rodziną.",
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
        ...(pathname !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name:
                  pathname === "/rules"
                    ? "Regulamin"
                    : pathname === "/relations"
                    ? "Fotorelacje"
                    : pathname === "/turnee"
                    ? "Turnieje"
                    : "Strona",
                item: `${baseUrl}${pathname}`,
              },
            ]
          : []),
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
