// Fishing Chatbot (prosta wersja oparta na danych lokalnych)

const chatData = [
  {
    question: [
      "jaka jest cena",
      "ile kosztuje",
      "cennik",
      "koszt",
      "opłata",
      "opłaty",
    ],
    answer:
      "🎣 Wędkowanie z brzegu kosztuje 30 zł (od 6:00 do zmierzchu). Doba karpiowa to 50 zł – ale pamiętaj, trzeba to wcześniej ustalić z właścicielem!",
  },
  {
    question: [
      "jak zapłacić",
      "płatność",
      "czy można online",
      "płatność online",
      "zapłata",
    ],
    answer:
      "💳 Możesz zapłacić online przez skrzynkę „OPŁATA” w prawym górnym rogu strony – wygodnie i szybko.",
  },
  {
    question: ["gdzie to jest", "jak dojechać", "lokalizacja", "adres", "mapa"],
    answer:
      "📍 Łowisko Eko-Torf Ludwinek znajdziesz w miejscowości Ludwinek, na terenie dawnej kopalni torfu. Wpisz w nawigację 'Ludwinek Eko-Torf'!",
  },
  {
    question: [
      "czy można zabierać ryby",
      "czy można wziąć rybę",
      "czy obowiązuje no kill",
      "no kill",
      "czy można ryby",
    ],
    answer:
      "🚫 Obowiązuje zasada „no-kill”! Wszystkie ryby wracają do wody – szanujemy naturę i nasze piękne okazy.",
  },
  {
    question: [
      "kontakt",
      "numer telefonu",
      "właściciel",
      "jak się skontaktować",
      "czy mogę zadzwonić",
    ],
    answer:
      "📞 Właściciel czeka na Twój telefon – zadzwoń pod numer 786 819 629 lub napisz przez Facebooka.",
  },

  {
    question: ["czy są zawody", "zawody", "jakie zawody", "kiedy zawody"],
    answer:
      "🏆 Jasne, organizujemy zawody! Sprawdź sekcję „ZAWODY” w menu – tam znajdziesz szczegóły najbliższej rywalizacji karpiowej Big Fish 🎣",
  },
  {
    question: [
      "czy można z dziećmi",
      "czy łowisko dla dzieci",
      "czy dzieci mogą łowić",
    ],
    answer:
      "👨‍👩‍👧‍👦 Oczywiście! Łowisko jest przyjazne rodzinom. Zabierz dzieciaki – będą zachwycone przyrodą i rybami!",
  },
  {
    question: ["czy jest parking", "gdzie zaparkować", "parking"],
    answer:
      "🅿️ Tak, mamy miejsce do zaparkowania – bez problemu postawisz auto w pobliżu łowiska.",
  },
  {
    question: ["czy mogę łowić w nocy", "nocne łowienie", "nocna zasiadka"],
    answer:
      "🌙 Nocna zasiadka jest możliwa – ale tylko po wcześniejszym uzgodnieniu z właścicielem! Bez tego nie ma nocnego łowienia 😉",
  },
  {
    question: [
      "czy można z pontonu",
      "czy mogę wywozić",
      "czy dozwolona wywózka",
    ],
    answer:
      "🛶 Tak, ale tylko podczas zawodów lub po wcześniejszym uzgodnieniu z właścicielem. Na co dzień łowimy z brzegu.",
  },
  {
    question: ["czy są toalety", "czy jest wc", "czy są udogodnienia"],
    answer:
      "🚻 Na łowisku znajduje się toaleta – komfort to podstawa, nawet na rybach! 😄",
  },
  {
    question: [
      "czy można grillować",
      "czy mogę zrobić ognisko",
      "czy ognisko dozwolone",
    ],
    answer:
      "🔥 Grilla możesz zabrać, ale ogniska nie rozpalamy. Pamiętaj, by zostawić po sobie porządek!",
  },
];

export function getChatbotResponse(userInput: string) {
  const lowerInput = userInput.toLowerCase();

  for (const entry of chatData) {
    if (entry.question.some((q) => lowerInput.includes(q))) {
      return entry.answer;
    }
  }

  return "Niestety, nie rozumiem pytania. Spróbuj zapytać o cennik, płatność, lokalizację, kontakt lub zasady łowiska.";
}
