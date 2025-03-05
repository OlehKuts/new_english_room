import { v4 as uuidv4 } from 'uuid'

export const WORDS_ACTIONS = {
  ADD: "add",
  COMPLETE: "complete",
  REMOVE: "remove",
  IMPORT: "import",
}; //об'єкт з констант для уникнення помилок

export const initialState = () => {
  const wordsFromStorage = localStorage.getItem("words"); //отрим. по ключу
  const wordsParsed = JSON.parse(wordsFromStorage); //parse з JSON-формату
  return wordsParsed || []; //повертає words або пустий масив
};
export const wordsReducer = (words, action) => {
  const { type, _id, english, ukrainian, notes, payload } = action;

  switch (type) {
    case WORDS_ACTIONS.IMPORT:
      return payload.importedWords;
    case WORDS_ACTIONS.ADD:
      return [
        {
          _id: uuidv4(),
          english: english,
          ukrainian: ukrainian,
          notes: notes,
          completed: false,
        },
        ...words,
      ];
    case WORDS_ACTIONS.COMPLETE:
      return words.map((word) =>
        word._id === _id ? { ...word, completed: !word.completed } : word
      );
    case WORDS_ACTIONS.REMOVE:
      return words.filter((word) => word._id !== _id);

    default:
      throw new Error(); // видаватиме помилку при передачі невідомого методу
  }
}; //власне Reducer, який буде першим парам в useReducer()
