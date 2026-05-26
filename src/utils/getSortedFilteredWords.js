// import { conditions } from "../staticData"

export const getSortedFilteredWords = (condition, words) => {
  switch (condition) {
    case "uncompleted":
      return words.filter((word) => !word.completed);
      break;
    case "random":
      return [...words].sort(() => Math.random() - 0.5);
      break;
    case "alphabetically":
      return [...words].sort((a, b) => a.english.localeCompare(b.english));
      break;
    case "nouns":
      return words.filter((item) => item.part === "noun");
      break;
    case "verbs":
      return words.filter((item) => item.part === "verb");
      break;
    case "adjectives":
      return words.filter((item) => item.part === "adjective");
      break;
    case "adverbs":
      return words.filter((item) => item.part === "adverb");
      break;
    case "phrases":
      return words.filter((item) => item.part === "phrase");
      break;
    case "other":
      return words.filter((item) => item.part === "other");
      break;
    case "last 50 randomly":
      return [...words].slice(0, 50).sort(() => Math.random() - 0.5);
      break;
    // deutsch part
    case "unbekannte":
      return words.filter((word) => !word.completed);
      break;
    case "zufällige":
      return [...words].sort(() => Math.random() - 0.5);
      break;
    case "alphabetisch":
      return [...words].sort((a, b) => a.english.localeCompare(b.english));
      break;
    case "nomen":
      return words.filter((item) => item.part === "nomen");
      break;
    case "verben":
      return words.filter((item) => item.part === "verb");
      break;
    case "adjektive":
      return words.filter((item) => item.part === "adjektiv");
      break;
    case "adverbien":
      return words.filter((item) => item.part === "adverb");
      break;
    case "phrasen":
      return words.filter((item) => item.part === "phrase");
      break;
    case "sonstige":
      return words.filter((item) => item.part === "sonstige");
      break;
    case "50 letzten zufälligen":
      return [...words].slice(0, 50).sort(() => Math.random() - 0.5);
      break;
    default:
      return words;
      break;
  }
};
