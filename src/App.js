import React, { useState, useMemo } from "react";
import { MainForm } from "./components/mainForm";
import "./styles.css";
import { WordItem } from "./WordItem";
import { IrregularTable } from "./components/irregularTable";
import { useWordsHook } from "./hooks/useWordsHook";
import { WordsContext } from "./wordsContext";
import { Icon } from "./icon";
import { irregularVerbs, phraseList } from "./database";
import { Text } from "./components/text";
import { Phrase } from "./components/Phrase";
import useCopyToClipboard from "./custom_hooks/useCopyToClipboard";
import { conditions } from "./staticData";
import { getSortedFilteredWords } from "./utils/getSortedFilteredWords";

export const App = () => {
  const [active, setActive] = useState(false);
  const [showHeaderPart, setShowHeaderPart] = useState([
    true,
    false,
    false,
    false,
  ]);
  const { words, onAdd, onSwitch, onRemove, onImport, enVisibility, changeEnVisibility } = useWordsHook();
 
  const [condition, setCondition] = useState(conditions[0]);
  const onConditionChange = (e) => setCondition(e.target.value);
  
  // import-export
  const [showImport, setShowImport] = useState(false);
  const [copiedToClipboard, { success }] = useCopyToClipboard();
  const [importedData, setImportedData] = useState("");

  const exportData = () => {
    copiedToClipboard(JSON.stringify(words));
    alert(
      "Дані з запитаннями та відповіддями скопійовано в буфер обіну. Збережіть їх в текстовому документі, щоб використати пізніше."
    );
  };

  const sortedWords = useMemo(() => {
   return getSortedFilteredWords(condition, words);
  }, [condition, words]);


  const [randomPhrases, setRandomPhrases] = useState([...phraseList]);
  const onRandomPhraseSubmit = (e) => {
    e.preventDefault();
    const sortedList = [...randomPhrases].sort(() => Math.random() - 0.5);
    setRandomPhrases(sortedList);
  };

  return (
    <>
      <nav className={` ${active ? "active" : ""}`}>
        <ul className="nav-links">
          <li className="headerName">
            <Icon name="vocabulary" size="20px" color="orange" />

            <span className="headerSpan">English room</span>
          </li>
          <li
            onClick={() => setShowHeaderPart([true, false, false, false])}
            className={`navbar-links ${showHeaderPart[0] ? "selected" : ""}`}
          >
            All list
          </li>
          <li
            onClick={() => setShowHeaderPart([false, true, false, false])}
            className={`navbar-links ${showHeaderPart[1] ? "selected" : ""}`}
          >
            Irregular Verbs
          </li>

          <li
            onClick={() => setShowHeaderPart([false, false, true, false])}
            className={`navbar-links ${showHeaderPart[2] ? "selected" : ""}`}
          >
            Main phrases
          </li>
          <li
            onClick={() => setShowHeaderPart([false, false, false, true])}
            className={`navbar-links ${showHeaderPart[3] ? "selected" : ""}`}
          >
            Import&Export
          </li>
        </ul>
        <div
          onClick={() => setActive(!active)}
          className={`hamburger ${active ? "active" : ""}`}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
      <div className="landing">
        {showHeaderPart[0] ? (
          <>
            <div className="generalInfo">
              <div>Overall - {words.length}</div>
              <div>
                Unknown - {words.filter((word) => !word.completed).length}
              </div>
              <div>
                Studied - {words.filter((word) => word.completed).length}
              </div>
            </div>
            <hr />
            <div className="generalInfo">
              <div>List type</div>

              <select onChange={onConditionChange}>
                {conditions.map((cond, idx) => (
                  <option value={cond} key={idx}>
                    {cond}
                  </option>
                ))}
              </select>
              <button onClick={changeEnVisibility} style={{backgroundColor : enVisibility ? "lavender" : "beige"}}>
                {enVisibility ? "EN mode" : "UA mode"}</button>
            </div>
            <hr />
            <div className="allList">
              <MainForm onAdd={onAdd} />
              <WordsContext.Provider value={words}>
                <div className="wordList">
                  <hr />
                  <>
                    {sortedWords.length === 0
                      ? "There are no words in your list!"
                      : sortedWords.map((word, index) => (
                          <WordItem
                            key={word._id}
                            word={word}
                            onSwitch={onSwitch}
                            onRemove={onRemove}
                            index={index + 1}
                            enVisibility={enVisibility}
                          />
                        ))}
                  </>
                </div>
              </WordsContext.Provider>
            </div>
          </>
        ) : null}

        {showHeaderPart[1] ? (
          <>
            <h1 className="completeListName">
              {" "}
              {irregularVerbs.length} irregular verbs
            </h1>
            <hr />
            <div className="irregularTable">
              <div
                className="verbItem"
                style={{
                  backgroundColor: "cornflowerblue",
                  color: "white",
                }}
              >
                <div className="trSection">
                  {" "}
                  <Text>Base form</Text>
                </div>
                <div className="trSection">
                  {" "}
                  <Text>Past simple</Text>
                </div>
                <div className="trSection">
                  {" "}
                  <Text size="1rem">-ed</Text>
                </div>
                <div className="trSection">
                  {" "}
                  <Text size="1rem">Translation</Text>
                </div>
              </div>
              {irregularVerbs.map((verb, idx) => (
                <IrregularTable verb={verb} key={idx} idx={idx} />
              ))}
            </div>
          </>
        ) : null}
        {showHeaderPart[2] ? (
          <>
            <div className="newFour">
              <form>
                <button type="submit" onClick={onRandomPhraseSubmit}>
                  Sort
                </button>
              </form>
            </div>
            <h1 className="completeListName">
              {" "}
              List of important phrases ({phraseList.length} phrases)
            </h1>
            <hr />

            {randomPhrases.map((i, idx) => (
              <Phrase phrase={i} idx={idx} />
            ))}
          </>
        ) : null}

        {showHeaderPart[3] ? (
          <>
            <div className="importBlock">
              <button
                onClick={exportData}
                className="importBlockBtn"
                id="exportBtn"
              >
                {success ? "Дані скопійовано" : "Експортувати дані"}
              </button>
              <button
                onClick={() => setShowImport(true)}
                className="importBlockBtn"
              >
                Імпортувати дані
              </button>
            </div>
            <hr />
            {showImport ? (
              <div className="importBlock">
                <textarea
                  placeholder="Вставте сюди дані для імпорту..."
                  value={importedData}
                  onChange={(e) => setImportedData(e.target.value)}
                  cols="100"
                  rows="30"
                />
                <div>
                  <button
                    onClick={() => {
                      onImport(importedData);
                      setShowHeaderPart([true, false, false, false]);
                    }}
                  >
                    Підтвердити
                  </button>
                  <button onClick={() => setShowImport(false)}>
                    Відмінити
                  </button>
                </div>
                <hr />
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};
