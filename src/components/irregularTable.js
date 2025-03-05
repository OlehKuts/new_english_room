import React from "react";
import "../styles.css";
import { Text } from "./text";

export const IrregularTable = ({ verb, idx, ...props }) => {
  return (
    <div
      className="verbItem"
      style={{
        backgroundColor: idx % 2 === 1 ? "lavender" : "white"
      }}
      {...props}
    >
      <div
        className="trSection"
        style={{
          textDecoration: "underline"
        }}
      >
        {" "}
        <Text>{verb.base}</Text>
      </div>
      <div className="trSection">
        {" "}
        <Text>{verb.pastSimple}</Text>
      </div>
      <div className="trSection">
        {" "}
        <Text>{verb.ed}</Text>
      </div>
      <div className="trSection">
        {" "}
        <Text>{verb.translation}</Text>
      </div>
    </div>
  );
};
