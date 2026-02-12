import Link from "next/link";
import styles from "./privacyPolicy.module.css";

const PAGE_TITLE = "Polityka prywatności";
const PAGE_SUBTITLE =
  "Poniżej znajdziesz informacje o przetwarzaniu danych osobowych w serwisie oraz o publikacji zdjęć w galerii za zgodą.";

const ADMIN = {
  name: "Jarosław Jakubowski",
  address: "Ludwin 1C, 21-075 Ludwin",
  email: "kontakt@wędkowanie-ludwin.pl",
  phone: "691 911 777",
};

const SERVICE_URL = "https://www.wędkowanie-ludwin.pl";
const HOSTING_PROVIDER = "home.pl";
const LAST_UPDATE = "12.02.2026"; // <- zmień na aktualną datę

export default function PrivacyPolicyPage() {
  return (
    <section className={styles.policy} aria-labelledby="policy-title">
      <div className="container">
        <header className={styles.header}>
          <h1 id="policy-title" className={styles.title}>
            {PAGE_TITLE}
          </h1>
          <p className={styles.subtitle}>{PAGE_SUBTITLE}</p>
        </header>

        <article className={styles.content}>
          <h2 className={styles.h2}>1. Informacje ogólne</h2>
          <p className={styles.p}>
            Niniejsza polityka prywatności dotyczy serwisu internetowego
            działającego pod adresem: <strong>{SERVICE_URL}</strong>.
          </p>

          <h2 className={styles.h2}>2. Administrator danych</h2>
          <p className={styles.p}>
            Administratorem danych osobowych jest: <strong>{ADMIN.name}</strong>
            <br />
            Adres: {ADMIN.address}
            <br />
            Kontakt:{" "}
            <a href={`mailto:${ADMIN.email}`} className={styles.link}>
              {ADMIN.email}
            </a>{" "}
            /{" "}
            <a
              href={`tel:${ADMIN.phone.replace(/ /g, "")}`}
              className={styles.link}
            >
              {ADMIN.phone}
            </a>
          </p>

          <h2 className={styles.h2}>3. Zakres przetwarzanych danych</h2>
          <p className={styles.p}>
            W serwisie mogą być publikowane zdjęcia przedstawiające osoby
            korzystające z łowiska. Wizerunek osoby stanowi dane osobowe w
            rozumieniu przepisów RODO.
          </p>
          <p className={styles.p}>
            Serwis może przetwarzać również dane techniczne związane z
            korzystaniem z witryny (np. adres IP, dane przeglądarki, informacje
            o urządzeniu, logi serwera) w celu zapewnienia bezpieczeństwa i
            prawidłowego działania strony.
          </p>

          <h2 className={styles.h2}>4. Cele przetwarzania</h2>
          <ul className={styles.ul}>
            <li>prowadzenie galerii zdjęć na stronie,</li>
            <li>promocja działalności łowiska,</li>
            <li>dokumentowanie połowów oraz wydarzeń wędkarskich.</li>
          </ul>

          <h2 className={styles.h2}>5. Podstawa prawna</h2>
          <p className={styles.p}>
            Podstawą przetwarzania danych w postaci wizerunku jest dobrowolna
            zgoda osoby, której wizerunek jest publikowany (art. 6 ust. 1 lit. a
            RODO).
          </p>
          <p className={styles.p}>
            Podstawą przetwarzania danych technicznych i logów serwera jest
            prawnie uzasadniony interes administratora polegający na zapewnieniu
            bezpieczeństwa i prawidłowego działania serwisu (art. 6 ust. 1 lit.
            f RODO).
          </p>

          <h2 className={styles.h2}>6. Publikacja zdjęć i cofnięcie zgody</h2>
          <p className={styles.p}>
            Zdjęcia przedstawiające osoby publikowane są wyłącznie za ich
            dobrowolną zgodą. Zgodę można cofnąć w dowolnym momencie,
            kontaktując się z administratorem. Po otrzymaniu żądania
            administrator usunie zdjęcie lub ograniczy jego dostępność w
            rozsądnym terminie.
          </p>

          <h2 className={styles.h2}>7. Okres przechowywania</h2>
          <p className={styles.p}>
            Zdjęcia są przechowywane do czasu cofnięcia zgody lub zgłoszenia
            żądania usunięcia wizerunku. Dane techniczne (np. logi serwera) są
            przechowywane przez okres wynikający z ustawień i wymogów dostawców
            usług hostingowych, nie dłużej niż jest to niezbędne do celów
            bezpieczeństwa i prawidłowego działania serwisu.
          </p>

          <h2 className={styles.h2}>8. Odbiorcy danych</h2>
          <p className={styles.p}>
            Dane mogą być powierzane podmiotom wspierającym administratora w
            utrzymaniu serwisu, w szczególności:
          </p>
          <ul className={styles.ul}>
            <li>firma hostingowa: {HOSTING_PROVIDER},</li>
            <li>
              operatorzy poczty elektronicznej (w zakresie obsługi kontaktu
              e-mail),
            </li>
            <li>
              dostawcy usług przechowywania i dostarczania zdjęć (CDN), np.
              Cloudinary (w zakresie obsługi galerii).
            </li>
          </ul>

          <h2 className={styles.h2}>9. Przekazywanie danych poza EOG</h2>
          <p className={styles.p}>
            W związku z korzystaniem z usług dostawców infrastruktury IT (np.
            CDN do zdjęć) dane mogą być przetwarzane poza Europejskim Obszarem
            Gospodarczym (EOG). W takich przypadkach transfer odbywa się zgodnie
            z przepisami RODO, w szczególności na podstawie odpowiednich
            zabezpieczeń prawnych (np. standardowych klauzul umownych).
          </p>

          <h2 className={styles.h2}>10. Prawa osób, których dane dotyczą</h2>
          <p className={styles.p}>Masz prawo do:</p>
          <ul className={styles.ul}>
            <li>dostępu do danych,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych (w tym żądania usunięcia zdjęcia),</li>
            <li>ograniczenia przetwarzania,</li>
            <li>
              cofnięcia zgody (jeśli przetwarzanie odbywa się na podstawie
              zgody),
            </li>
            <li>wniesienia skargi do Prezesa UODO.</li>
          </ul>
          <p className={styles.p}>
            W celu realizacji swoich praw skontaktuj się z administratorem
            danych.
          </p>

          <h2 className={styles.h2}>11. Formularze, konta i profilowanie</h2>
          <p className={styles.p}>
            Serwis nie posiada formularzy do wprowadzania danych osobowych, nie
            prowadzi rejestracji kont użytkowników oraz nie stosuje profilowania
            ani zautomatyzowanego podejmowania decyzji.
          </p>

          <h2 className={styles.h2}>12. Pliki cookies</h2>
          <p className={styles.p}>
            Serwis może wykorzystywać wyłącznie pliki cookies niezbędne do
            prawidłowego działania strony (tzw. cookies techniczne). Serwis nie
            wykorzystuje cookies do celów marketingowych ani analitycznych.
            Użytkownik może zarządzać plikami cookies w ustawieniach swojej
            przeglądarki.
          </p>

          <p className={styles.small}>Ostatnia aktualizacja: {LAST_UPDATE}</p>
        </article>
      </div>
    </section>
  );
}
