import React, { useState } from "react";
import "../styles.css";
import { Text } from "./text";
import { Icon } from "../icon";

export const Phrase = ({ phrase, idx, ...props }) => {
  const { ukrainian, english } = phrase;
  const [showEnglish, setShowEnglish] = useState(false);
  return (
    <>
      <div className="phraseLine" {...props}>
        <Text size="1.5rem"> {ukrainian} </Text>
      </div>
      <div
        className="phraseLine"
        style={{
          backgroundColor: idx % 2 === 1 ? "lavender" : "azure"
        }}
      >
        {showEnglish && (
          <div className="englishPhrase">
            <Text size="1.5rem">{english}</Text>
            <Icon
              name="falseAnswer"
              size="1.5rem"
              color="red"
              onClick={() => setShowEnglish(false)}
              margin-left="5rem"
            />{" "}
          </div>
        )}
        {!showEnglish && (
          <button className="phraseBtn" onClick={() => setShowEnglish(true)}>
            {" "}
            <Icon name="eye" size="1.5rem" />
          </button>
        )}
      </div>
    </>
  );
};
