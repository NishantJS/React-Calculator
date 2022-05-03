import React from "react";
import Operand from "./Operand";
import Operator from "./Operator";

const Buttons = ({ dispatch }) => {
  const digits = [
    ["c", "+/-", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  return digits.flat(1).map((button) => {
    const isNumber = typeof button === "string";
    return isNumber ? (
      <Operator operation={button} dispatch={dispatch} key={button} />
    ) : (
      <Operand digit={button} dispatch={dispatch} key={button} />
    );
  });
};

export default Buttons;
