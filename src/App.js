import React, { useState, useMemo, useEffect } from "react";
import { MainForm } from "./components/mainForm";
import "./styles.css";
import { WordItem } from "./WordItem";
import { IrregularTable } from "./components/irregularTable";
import { useWordsHook } from "./hooks/useWordsHook";
import { WordsContext } from "./wordsContext";
import { Icon } from "./icon";
import { Text } from "./components/text";
import { Phrase } from "./components/Phrase";
import useCopyToClipboard from "./custom_hooks/useCopyToClipboard";
import { deutschData, englishData } from "./staticData";
import { getSortedFilteredWords } from "./utils/getSortedFilteredWords";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defineLanguage } from "./utils/defineLanguage";

export const App = () => {
  const [active, setActive] = useState(false);
  const [showHeaderPart, setShowHeaderPart] = useState([
    true,
    false,
    false,
    false,
  ]);
  const {
    words,
    onAdd,
    onSwitch,
    onRemove,
    onImport,
    enVisibility,
    changeEnVisibility,
  } = useWordsHook();

  const [uiLanguage, setUiLanguage] = useLocalStorage("uiLanguage", "english");
  const [
    {
      conditions,
      parts,
      appTitle,
      allList,
      irregularVerbsName,
      mainPhrases,
      importExport,
      overall,
      unknown,
      studied,
      listType,
      mode,
      shortName,
      newWord,
      yourAnswer,
      emptyListNotification,
      add,
      verbForms,
      irregularVerbs,
      phraseList,
    },
    setUiData,
  ] = useState(defineLanguage(uiLanguage, englishData, deutschData));
  //
  const [condition, setCondition] = useState(conditions[0]);
  const onConditionChange = (e) => setCondition(e.target.value);

  // import-export
  const [showImport, setShowImport] = useState(false);
  const [copiedToClipboard, { success }] = useCopyToClipboard();
  const [importedData, setImportedData] = useState("");

  const exportData = () => {
    copiedToClipboard(JSON.stringify(words));
    alert(
      "Дані з запитаннями та відповіддями скопійовано в буфер обіну. Збережіть їх в текстовому документі, щоб використати пізніше.",
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
  useEffect(() => {
    setUiData(defineLanguage(uiLanguage, englishData, deutschData));
  }, [uiLanguage]);
  // console.log(defineLanguage("deutsch", englishData, deutschData));
  return (
    <>
      <nav className={` ${active ? "active" : ""}`}>
        <ul className="nav-links">
          <li className="headerName">
            <Icon name="vocabulary" size="20px" color="orange" />

            <span className="headerSpan">{appTitle}</span>
          </li>
          <li
            onClick={() => setShowHeaderPart([true, false, false, false])}
            className={`navbar-links ${showHeaderPart[0] ? "selected" : ""}`}
          >
            {allList}
          </li>
          <li
            onClick={() => setShowHeaderPart([false, true, false, false])}
            className={`navbar-links ${showHeaderPart[1] ? "selected" : ""}`}
          >
            {irregularVerbsName}
          </li>

          <li
            onClick={() => setShowHeaderPart([false, false, true, false])}
            className={`navbar-links ${showHeaderPart[2] ? "selected" : ""}`}
          >
            {mainPhrases}
          </li>
          <li
            onClick={() => setShowHeaderPart([false, false, false, true])}
            className={`navbar-links ${showHeaderPart[3] ? "selected" : ""}`}
          >
            {importExport}
          </li>
          <li className={`navbar-links`}>
            <span
              className={`lngSpan ${uiLanguage === "english" ? "activeLng" : ""}`}
              onClick={() => {
                setUiLanguage("english");
              }}
            >
              EN
            </span>
            <span
              className={`lngSpan ${uiLanguage === "deutsch" ? "activeLng" : ""}`}
              onClick={() => {
                setUiLanguage("deutsch");
              }}
            >
              DE
            </span>
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
              <div>
                {overall} - {words.length}
              </div>
              <div>
                {unknown} - {words.filter((word) => !word.completed).length}
              </div>
              <div>
                {studied} - {words.filter((word) => word.completed).length}
              </div>
            </div>
            <hr />
            <div className="generalInfo">
              <div>{listType}</div>

              <select onChange={onConditionChange}>
                {conditions.map((cond, idx) => (
                  <option value={cond} key={idx}>
                    {cond}
                  </option>
                ))}
              </select>
              <button
                onClick={changeEnVisibility}
                style={{ backgroundColor: enVisibility ? "lavender" : "beige" }}
              >
                {enVisibility ? `${shortName} ${mode}` : `UA ${mode}`}
              </button>
            </div>
            <hr />
            <div className="allList">
              <MainForm
                onAdd={onAdd}
                parts={parts}
                newWord={newWord}
                add={add}
              />
              <WordsContext.Provider value={words}>
                <div className="wordList">
                  <hr />
                  <>
                    {sortedWords.length === 0
                      ? emptyListNotification
                      : sortedWords.map((word, index) => (
                          <WordItem
                            key={word._id}
                            word={word}
                            onSwitch={onSwitch}
                            onRemove={onRemove}
                            index={index + 1}
                            enVisibility={enVisibility}
                            yourAnswer={yourAnswer}
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
              {irregularVerbs.length} {irregularVerbsName}
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
                {verbForms.map((item) => (
                  <div key={item} className="trSection">
                    {" "}
                    <Text>{item}</Text>
                  </div>
                ))}
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
              <h4 className="completeListName">
                {" "}
                Перелік поширених фраз ({phraseList.length})
              </h4>
              <form>
                <button type="submit" onClick={onRandomPhraseSubmit}>
                  Випадковий порядок
                </button>
              </form>
            </div>

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
