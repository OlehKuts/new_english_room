import React from "react";
import { iconsConfig } from "./configIcons";

export const Icon = ({ name, ...props }) => {
  const IconC = iconsConfig[name];
  return <IconC {...props} />;
};

Icon.defaultProps = {
  size: "14px",
  color: "black"
};
