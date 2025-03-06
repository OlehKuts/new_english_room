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
            return [...words].sort((a,b) => a.english.localeCompare(b.english));
            break;
            case "nouns":
            return words.filter(item => item.part === "noun");
            break;
            case "verbs":
            return words.filter(item => item.part === "verb");
            break;
            case "adjectives":
            return words.filter(item => item.part === "adjective");
            break;
            case "adverbs":
            return words.filter(item => item.part === "adverb");
            break;
            case "phrases":
            return words.filter(item => item.part === "phrase");
            break;
            case "other":
            return words.filter(item => item.part === "other");
            break;
          default: return words
            break;
        }
}

