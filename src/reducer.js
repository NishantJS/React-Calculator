import {
  ADD_DIGIT,
  CHOOSE_OPERATOR,
  CLEAR_ALL,
  DELETE_LAST,
  EVAL,
} from "./constants";
import { defaultState } from "./App";

export const reducer = (state, action) => {
  const { type, payload } = action;
  console.log({ state, action });
  switch (type) {
    case ADD_DIGIT:
      if (payload?.digit === "." && state.currentOperand?.includes("."))
        return state;
      if (payload?.digit === 0 && state.currentOperand === "0") return state;
      if (
        state.currentOperand === "0" &&
        payload?.digit !== 0 &&
        payload?.digit !== "."
      )
        return {
          ...state,
          currentOperand: `${payload?.digit}`,
        };

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload?.digit}`,
      };

    case CHOOSE_OPERATOR:
      if (!state.currentOperand && !state.previousOperand) return state;
      if (state?.previousOperand === null)
        return {
          ...state,
          operation: payload?.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };

      return state;

    case CLEAR_ALL:
      return defaultState;

    case EVAL:
      if (state.operation === null || state.previousOperand === null)
        return state;

      return {
        ...state,
        operation: null,
        previousOperand: null,
        overwite: true,
        currentOperand: evaluate(state),
      };

    default:
      return state;
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand);
  if (isNaN(current) || isNaN(previous)) return "";
  let expression = "";
  switch (operation) {
    case "+":
      expression = current + previous;
      break;
    case "-":
      expression = current - previous;
      break;
    case "/":
      expression = current / previous;
      break;
    case "*":
      expression = current * previous;
      break;
    case "%":
      expression = current % previous;
      break;
    default:
      break;
  }
  return expression.toString();
};
