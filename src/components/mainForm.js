import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import { Text } from "./text";

export const MainForm = ({ onAdd }) => {
  const [english, setEnglish] = useState("");
  const onEnglishChange = (e) => setEnglish(e.target.value);
  const [notes, setNotes] = useState("");
  const onNotesChange = (e) => setNotes(e.target.value);
  const [ukrainian, setUkrainian] = useState("");
  const onUkrainianChange = (e) => setUkrainian(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (english === "" || ukrainian === "") return;
    onAdd(english, ukrainian, notes);
    setEnglish("");
    setUkrainian("");
    setNotes("");
    // alert("Word has been added to list!");
  };
  const englishInput = useRef();
  // useEffect(() => englishInput.current.focus(), []); //uncomment when app will be ready completely

  return (
    <div className="mainForm">
      <Text size="18px">Add new word</Text>

      <form onSubmit={onSubmit}>
        <input
          maxLength="100"
          value={english}
          onChange={onEnglishChange}
          placeholder="new word..."
          ref={englishInput}
        />
        <input
          maxLength="100"
          value={ukrainian}
          onChange={onUkrainianChange}
          placeholder="нове слово..."
        />
        <p className="flexi">
          <textarea
            value={notes}
            onChange={onNotesChange}
            placeholder="примітки..."
            rows="5"
            cols="50"
          />
        </p>
        <p>
          {" "}
          <button type="submit">Відправити</button>{" "}
        </p>
      </form>
    </div>
  );
};
