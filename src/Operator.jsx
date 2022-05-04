import React from "react";
import { ADD_DIGIT, CHOOSE_OPERATOR, CLEAR_ALL, EVAL } from "./constants";

const Operator = ({ operation, dispatch }) => {
  const selectDispatch = (operator) => {
    switch (operator) {
      case ".":
        return dispatch({ type: ADD_DIGIT, payload: { digit: operation } });
      case "c":
        return dispatch({ type: CLEAR_ALL });
      case "+/-":
        return dispatch({ type: ADD_DIGIT, payload: { digit: operation } });
      case "=":
        return dispatch({ type: EVAL });
      default:
        return dispatch({ type: CHOOSE_OPERATOR, payload: { operation } });
    }
  };

  return (
    <button className="operator" onClick={() => selectDispatch(operation)}>
      {operation}
    </button>
  );
};

export default Operator;
