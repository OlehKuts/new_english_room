import { wordsReducer, WORDS_ACTIONS, initialState } from "../wordsReducer";
import { useReducer, useEffect, useState } from "react";
import { isJsonString } from "../utils/isJsonString";

export const useWordsHook = () => {
  const [words, dispatch] = useReducer(wordsReducer, initialState());
  const [enVisibility, setEnVisibility] = useState(false);
  const changeEnVisibility = () => setEnVisibility(!enVisibility)
  const onImport = (importedData) => {
    if (!isJsonString(importedData)) {
      alert("Невірний формат даних!");
      return;
    }
    dispatch({
      type: WORDS_ACTIONS.IMPORT,
      payload: { importedWords: JSON.parse(importedData) },
    });
    alert("Дані успішно імпортовано");
  };

  const onAdd = (english, ukrainian, notes, part) =>
    dispatch({
      english,
      ukrainian,
      notes,
      part,
      type: WORDS_ACTIONS.ADD,
    });

  const onSwitch = (_id) =>
    dispatch({
      _id,
      type: WORDS_ACTIONS.COMPLETE,
    });

  const onRemove = (_id) =>
    dispatch({
      _id,
      type: WORDS_ACTIONS.REMOVE,
    });

  useEffect(() => {
    const wordsStringified = JSON.stringify(words); //перетв. у JSON-формат
    localStorage.setItem("words", wordsStringified); //зберіг. у хранил. під ключем "words"
  }, [words]);

  return {
    words,
    onAdd,
    onSwitch,
    onRemove,
    onImport,
    enVisibility,
    changeEnVisibility
  };
};
