import React from "react";
import "../styles.css";
import T from "prop-types";

export const Text = ({ size, onClick, children, ...props }) => (
  <div className="text" {...{ onClick }} style={{ fontSize: size, ...props }}>
    {children}
  </div>
);

Text.propTypes = {
  size: T.string,
  onClick: T.func,
  children: T.oneOfType([T.string, T.node, T.arrayOf(T.node)]).isRequired
};
Text.defaultProps = {
  size: "14px",
  onClick: () => null //за замовчуванням ця ф-ція нічого не робить
};
