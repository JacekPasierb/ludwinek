import React from "react";
import rulesData from "../../data/rule.json";
import styles from "../styles/rules.module.css";

type RulesSection = {
  title: string;
  rules: string[];
};

type RulesContact = {
  info: string;
  phones: string[];
  facebook: string;
  website: string;
};

type RulesJson = {
  title: string;
  intro: string;
  sections: RulesSection[];
  entryNotice: string;
  paymentAddress: string;
  closingNote: string;
  contact: RulesContact;
};

const POLISH_TO_ASCII: Record<string, string> = {
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

const SECTION_REGULAMIN = "regulamin";
const SECTION_WAZNE = "wazne";
const SECTION_KONTAKT = "kontakt";
const TOC_REGULAMIN = "Regulamin";
const TOC_WAZNE = "Ważne informacje";
const TOC_KONTAKT = "Kontakt";
const TOC_TITLE = "Na tej stronie";
const SECTION_HINT_WAZNE = "Wejście i rozliczenia.";
const SECTION_HINT_KONTAKT = "W sprawach rezerwacji i organizacji łowiska.";
const PAYMENT_LABEL = "Adres do płatności";
const PAYMENT_HEADING = "ADRES DOKONYWANIA OPŁAT ZA ZEZWOLENIE:";
const CALLOUT_TITLE = "Informacja";
const CONTACT_OPIEKUN = "Opiekun łowiska (Jaro)";
const CONTACT_BIURO = "Biuro";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[ąćęłńóśźż]/g, (char) => POLISH_TO_ASCII[char] ?? char)
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getSectionWithId(section: RulesSection, index: number) {
  const base = slugify(section.title);
  return {...section, id: `${base}-${index + 1}`};
}

const data = rulesData as RulesJson;

const RulesPage = () => {
  const sectionsWithIds = data.sections.map(getSectionWithId);

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <header className={styles.hero}>
          <h1 className={styles.heading}>{data.title}</h1>
          <p className={styles.intro}>{data.intro}</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.toc}>
            <div className={styles.tocCard}>
              <div className={styles.tocTitle}>{TOC_TITLE}</div>
              <nav
                className={styles.tocNav}
                aria-label="Spis treści regulaminu"
              >
                <a className={styles.tocLink} href={`#${SECTION_REGULAMIN}`}>
                  {TOC_REGULAMIN}
                </a>
                {sectionsWithIds.map((s) => (
                  <a key={s.id} className={styles.tocLink} href={`#${s.id}`}>
                    {s.title}
                  </a>
                ))}
                <a className={styles.tocLink} href={`#${SECTION_WAZNE}`}>
                  {TOC_WAZNE}
                </a>
                <a className={styles.tocLink} href={`#${SECTION_KONTAKT}`}>
                  {TOC_KONTAKT}
                </a>
              </nav>
            </div>
          </aside>

          <main className={styles.content}>
            <div className={styles.surface}>
              <section id={SECTION_REGULAMIN} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{TOC_REGULAMIN}</h2>
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
                    <ol className={styles.rules} role="list">
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

              <section id={SECTION_WAZNE} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{TOC_WAZNE}</h2>
                  <p className={styles.sectionHint}>{SECTION_HINT_WAZNE}</p>
                </div>

                <div className={styles.twoCol}>
                  <div
                    className={`${styles.callout} ${styles.calloutInfo}`}
                    role="note"
                  >
                    <div className={styles.calloutTitle}>{CALLOUT_TITLE}</div>
                    <div className={styles.calloutText}>{data.entryNotice}</div>
                  </div>

                  <div className={styles.paymentCard}>
                    <div className={styles.paymentLabel}>{PAYMENT_LABEL}</div>
                    <div className={styles.paymentValue}>
                      <p>{PAYMENT_HEADING}</p>
                      <p>{data.paymentAddress}</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className={styles.divider} />

              <section id={SECTION_KONTAKT} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>{TOC_KONTAKT}</h2>
                  <p className={styles.sectionHint}>{SECTION_HINT_KONTAKT}</p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactTop}>
                    <div className={styles.contactTitle}>
                      {data.contact.info}
                    </div>
                    <div className={styles.contactPhones}>
                      <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>
                          {CONTACT_OPIEKUN}:{" "}
                        </span>
                        <a
                          href={`tel:+48${data.contact.phones[0].replace(
                            /\s/g,
                            ""
                          )}`}
                          className={styles.contactValue}
                          aria-label={`Zadzwoń: ${data.contact.phones[0]}`}
                        >
                          {data.contact.phones[0]}
                        </a>
                      </div>
                      <div className={styles.contactRow}>
                        <span className={styles.contactLabel}>
                          {CONTACT_BIURO}:{" "}
                        </span>
                        <a
                          href={`tel:+48${data.contact.phones[1].replace(
                            /\s/g,
                            ""
                          )}`}
                          className={styles.contactValue}
                          aria-label={`Zadzwoń: ${data.contact.phones[1]}`}
                        >
                          {data.contact.phones[1]}
                        </a>
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

export default RulesPage;
