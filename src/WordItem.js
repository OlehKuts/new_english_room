import React, { useEffect, useState } from "react";
import { Checkbox } from "./checkbox";
import { Icon } from "./icon";
import "./styles.css";
import { withCheckedStyles } from "./withCheckedStyles";
import { Text } from "./components/text";

export const WordItem = withCheckedStyles(
  ({ word, onSwitch, onRemove, index, enVisibility }) => {
    const [showNotes, setShowNotes] = useState(false);
    const [showEnglish, setShowEnglish] = useState(enVisibility);
    const [showUkrainian, setShowUkrainian] = useState(!enVisibility);
    const [visibleAnswer, setVisibleAnswer] = useState(false);
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(false);
    const toggleNotes = () => {
      setShowNotes(!showNotes);
    };
    const toggleVisibility = () => {
      if (enVisibility) {
        setShowUkrainian(!showUkrainian)
      }
      else {
        setShowEnglish(!showEnglish);
      }
      
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
    useEffect( () => {
      setShowEnglish(enVisibility);
      setShowUkrainian(!enVisibility)
    }, [enVisibility]
  )
    return (
      <>
        <div className="wordItem">
          <div>{index}</div>

          <Checkbox {...{ word, onSwitch }} />
          <div className="textPart">{showUkrainian ? word.ukrainian : null}</div>
          <button className="smallBtn" onClick={() => toggleVisibility()}>
            {" "}
            <Icon name="eye" size="20px" />
          </button>
          <div className="textPart"> {showEnglish ? word.english : null}</div>

          <div className="answerPart">
            <input
              placeholder="your answer..."
              value={answer}
              onChange={onAnswerChange}
            />
            <button className="smallBtn" onClick={() => sendAnswer()} title={visibleAnswer ? "hide answer" : "check spelling"}>
              {" "}
              <Icon name="validation" size="24px" />
            </button>
            {visibleAnswer && (
              <>
                {result && <Icon name="trueAnswer" size="2rem" color="green" />}
                {!result && <Icon name="falseAnswer" size="2rem" color="red" />}
              </>
            )}
          </div>

          <button className="smallBtn" onClick={() => toggleNotes()} title="show notes">
            <Icon name="notes" fill="navy" size="24px" />
          </button>
          <button id="removeBtn" onClick={() => onRemove(word._id)}  title={"remove"}>
            {" "}
            <Text color="maroon" size="20px">
              X
            </Text>
          </button>
        </div>
        <div>{showNotes ? word.notes || "No notes!" : null}</div>
      </>
    );
  }
);

