import React from "react";
import { ADD_DIGIT } from "./constants";

const Operand = ({ dispatch, digit }) => {
  return (
    <button
      className={`${digit === 0 ? "zero" : ""}`}
      onClick={() => dispatch({ type: ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};

export default Operand;
