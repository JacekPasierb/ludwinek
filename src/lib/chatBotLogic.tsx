// lib/chatBotLogic.ts
export async function getChatbotResponse(userInput: string) {
  try {
    const res = await fetch("/api/chatbot");
    const json = await res.json();
    const data = json.data;

    const lowerInput = userInput.toLowerCase();

    for (const entry of data) {
      if (entry.questions.some((q: string) => lowerInput.includes(q))) {
        return entry.answer;
      }
    }

    return "Niestety, nie rozumiem pytania. Spróbuj zapytać o cennik, płatność, lokalizację, kontakt lub zasady łowiska.";
  } catch (err) {
    console.error("Błąd pobierania danych chatbota:", err);
    return "Wystąpił błąd podczas próby odpowiedzi. Spróbuj ponownie później.";
  }
}
