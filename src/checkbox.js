import React, { useState, useContext } from "react";
import { WordsContext } from "./wordsContext";

export const Checkbox = ({ word, onSwitch }) => {
  const [checked, setChecked] = useState(word.completed);
  const onChange = (event) => {
    onSwitch(event.target.value);
    setChecked(!checked);
  };

  const theme = useContext(WordsContext);
  return (
    <input
      type="checkbox"
      value={word._id}
      onChange={onChange}
      checked={checked}
    />
  );
};

