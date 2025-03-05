import React from "react";
import { Text } from "./components/text";

export const wordText = ({ word, additionalStyles }) => {
  return (
    <>
      <Text size="10px" {...additionalStyles}>
        {word.text}
      </Text>
    </>
  );
};
