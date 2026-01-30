"use client";

import React, {useMemo} from "react";
import rules from "../../data/rule.json";
import styles from "../styles/rules.module.css";


type RulesJson = {
  title: string;
  intro: string;
  sections: {title: string; rules: string[]}[];
  entryNotice: string;
  paymentAddress: string;
  closingNote: string;
  contact: {
    info: string;
    phones: string[];
    facebook: string;
    website: string;
  };
};

const data = rules as unknown as RulesJson;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (m) => {
      const map: Record<string, string> = {
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        ó: "o",
        ś: "s",
        ź: "z",
        ż: "z",
      };
      return map[m] ?? m;
    })
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const Page = () => {
  const sectionsWithIds = useMemo(() => {
    return data.sections.map((s, idx) => {
      // Na wypadek powtórzeń tytułów dodaję suffix z indexem
      const base = slugify(s.title);
      const id = `${base}-${idx + 1}`;
      return {...s, id};
    });
  }, []);

  // Wyciągamy sekcję z limitami/rybami (u Ciebie to tytuł "5. Zasady NO KILL i limity zabieranych ryb")
  // Jeśli kiedyś zmienisz nazwę, nadal zadziała, bo szukamy po fragmencie.
  const fishSection = useMemo(() => {
    return sectionsWithIds.find((s) =>
      s.title.toLowerCase().includes("no kill")
    );
  }, [sectionsWithIds]);

  // Z fishSection wyciągamy elementy, które wyglądają jak lista limitów (w mojej wersji były jako osobne stringi po wprowadzeniu)
  // Pozostałe teksty (NO KILL / zakazy) zostaną pokazane w calloutach.
  const fishList = useMemo(() => {
    if (!fishSection) return [];
    return fishSection.rules.filter(
      (r) => /–|-\s*max\.|NO KILL|\b0 szt\./i.test(r) && /–/i.test(r)
    );
  }, [fishSection]);

  const fishNotices = useMemo(() => {
    if (!fishSection) return {bans: [], notes: []};

    const bans = fishSection.rules.filter(
      (r) =>
        r.toLowerCase().includes("bezwzględny") ||
        r.toLowerCase().includes("zakaz") ||
        r.toLowerCase().includes("no kill") ||
        r.toLowerCase().includes("złów i wypuść")
    );

    // notki informacyjne, które nie są „pigułkami” z listą
    const notes = fishSection.rules.filter(
      (r) => !fishList.includes(r) && !bans.includes(r)
    );

    return {bans, notes};
  }, [fishSection, fishList]);

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <header className={styles.hero}>
          
          <h1 className={styles.heading}>{data.title}</h1>
          <p className={styles.intro}>{data.intro}</p>
        </header>

        <div className={styles.layout}>
          {/* Sticky spis treści (desktop) */}
          <aside className={styles.toc}>
            <div className={styles.tocCard}>
              <div className={styles.tocTitle}>Na tej stronie</div>

              <nav className={styles.tocNav}>
                <a className={styles.tocLink} href="#regulamin">
                  Regulamin
                </a>

                {/* Sekcje regulaminu */}
                {sectionsWithIds.map((s) => (
                  <a key={s.id} className={styles.tocLink} href={`#${s.id}`}>
                    {s.title}
                  </a>
                ))}

                <a className={styles.tocLink} href="#wazne">
                  Ważne informacje
                </a>
                <a className={styles.tocLink} href="#kontakt">
                  Kontakt
                </a>
              </nav>
            </div>
          </aside>

          {/* Główna treść */}
          <main className={styles.content}>
            <div className={styles.surface}>
              {/* Regulamin – sekcje */}
              <section id="regulamin" className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Regulamin</h2>
                </div>

                {sectionsWithIds.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={styles.section}
                  >
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>{section.title}</h3>
                    </div>

                    <ol className={styles.rules}>
                      {section.rules.map((rule, i) => (
                        <li key={i} className={styles.ruleRow}>
                          <span className={styles.ruleIndex}>{i + 1}</span>
                          <p className={styles.ruleText}>{rule}</p>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </section>

              <div className={styles.divider} />

              {/* Ważne info + płatność */}
              <section id="wazne" className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Ważne informacje</h2>
                  <p className={styles.sectionHint}>Wejście i rozliczenia.</p>
                </div>

                <div className={styles.twoCol}>
                  <div className={`${styles.callout} ${styles.calloutInfo}`}>
                    <div className={styles.calloutTitle}>Informacja</div>
                    <div className={styles.calloutText}>{data.entryNotice}</div>
                  </div>

                  <div className={styles.paymentCard}>
                    <div className={styles.paymentLabel}>
                      Adres do płatności
                    </div>
                    <div className={styles.paymentValue}>
                      <p>ADRES DOKONYWANIA OPŁAT ZA ZEZWOLENIE:</p>
                      <p> {data.paymentAddress}</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className={styles.divider} />

              {/* Kontakt */}
              <section id="kontakt" className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Kontakt</h2>
                  <p className={styles.sectionHint}>
                    W sprawach rezerwacji i organizacji łowiska.
                  </p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactTop}>
                    <div className={styles.contactTitle}>
                      {data.contact.info}
                    </div>

                    <div className={styles.contactPhones}>
                      <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>
                          Opiekun łowiska (Jaro):{" "}
                        </span>
                        <span className={styles.contactValue}>
                          {data.contact.phones[0]}
                        </span>
                      </div>

                      <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>Biuro: </span>
                        <span className={styles.contactValue}>
                          {data.contact.phones[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className={styles.closing}>{data.closingNote}</p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Page;
