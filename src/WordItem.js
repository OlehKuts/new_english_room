import React, { useState } from "react";
import { Checkbox } from "./checkbox";
import { Icon } from "./icon";
import "./styles.css";
import { withCheckedStyles } from "./withCheckedStyles";
import { Text } from "./components/text";

export const WordItem = withCheckedStyles(
  ({ word, onSwitch, onRemove, index }) => {
    const [showNotes, setShowNotes] = useState(false);
    const [showEnglish, setShowEnglish] = useState(false);
    const [visibleAnswer, setVisibleAnswer] = useState(false);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(false);
    const toggleNotes = () => {
      setShowNotes(!showNotes);
    };
    const toggleEnglish = () => {
      setShowEnglish(!showEnglish);
    };
    const sendAnswer = () => {
      if (answer === "") return;
      if (!visibleAnswer) {
        setVisibleAnswer(true);
        if (word.english === answer) {
          setResult(true);
        } else {
          setResult(false);
        }
      } else {
        setVisibleAnswer(false);
        setAnswer("");
      }
    };

    const onAnswerChange = (e) => {
      setAnswer(e.target.value);
    };
    return (
      <>
        <div className="wordItem">
          <div>{index}</div>

          <Checkbox {...{ word, onSwitch }} />
          <div className="textPart">{word.ukrainian}</div>
          <button className="smallBtn" onClick={() => toggleEnglish()}>
            {" "}
            <Icon name="eye" size="20px" />
          </button>
          <div className="englishPart"> {showEnglish && word.english}</div>

          <div className="answerPart">
            <input
              placeholder="your answer..."
              value={answer}
              onChange={onAnswerChange}
            />
            <button className="smallBtn" onClick={() => sendAnswer()}>
              {" "}
              <Icon name="validation" size="24px" />
            </button>
            {visibleAnswer && (
              <>
                {result && <Icon name="trueAnswer" size="2rem" color="green" />}
                {!result && <Icon name="falseAnswer" size="2rem" color="red" />}

                {/* {!result && <label>False</label>} */}
              </>
            )}
          </div>

          <button className="smallBtn" onClick={() => toggleNotes()}>
            <Icon name="edit" fill="olive" size="16px" />
          </button>
          <button id="removeBtn" onClick={() => onRemove(word._id)}>
            {" "}
            <Text color="maroon" size="20px">
              X
            </Text>
          </button>
        </div>
        <div>{showNotes ? word.notes : ""}</div>
      </>
    );
  }
);

