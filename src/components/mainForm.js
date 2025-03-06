import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import { Text } from "./text";
import { parts } from "../staticData";
import { hintPart } from "../utils/hintPart";

export const MainForm = ({ onAdd }) => {
  const englishInput = useRef();
  const [english, setEnglish] = useState("");
  const onEnglishChange = (e) => setEnglish(e.target.value);
  const [notes, setNotes] = useState("");
  const onNotesChange = (e) => setNotes(e.target.value);
  const [ukrainian, setUkrainian] = useState("");
  const onUkrainianChange = (e) => setUkrainian(e.target.value);
  const [part, setPart] = useState(parts[0]);
  const onPartChange = e => setPart(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (english === "" || ukrainian === "" || part === "") {
      alert("Заповніть усі поля, щоб додати нове слово!");
      return};
    onAdd(english, ukrainian, notes, part);
    setEnglish("");
    setUkrainian("");
    setNotes("");
    setPart(parts[0]);
    englishInput.current.focus()
  };

  useEffect(() => englishInput.current.focus(), []); 
   useEffect(() => hintPart(ukrainian, setPart), [ukrainian]); 
  return (
    <div className="mainForm">
      <Text size="18px">Add new word</Text>

      <form onSubmit={onSubmit}>
        <input
          maxLength="90"
          value={english}
          onChange={onEnglishChange}
          placeholder="new word..."
          ref={englishInput}
        />
        <input
          maxLength="90"
          value={ukrainian}
          onChange={onUkrainianChange}
          placeholder="нове слово..."
        />
        
        <select onChange={onPartChange} value={part}>
                {parts.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
       
        <p className="flexi">
          <textarea
            value={notes}
            onChange={onNotesChange}
            placeholder="примітки..."
            rows="3"
            cols="200"
          />
        </p>
        <p>
          {" "}
          <button type="submit">Add</button>{" "}
        </p>
      </form>
    </div>
  );
};
