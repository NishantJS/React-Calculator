import { ADD_DIGIT, CHOOSE_OPERATOR, CLEAR_ALL, EVAL } from "./constants";
import { defaultState } from "./App";

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_DIGIT:
      if (state.overwrite) {
        if (state.previousValues?.length > 10) {
          const array = state.previousValues.slice(0, 1, state.currentOperand);

          return {
            ...state,
            currentOperand: payload?.digit,
            overwrite: false,
            previousValues: [...array],
          };
        }
        return {
          ...state,
          overwrite: false,
          currentOperand: payload?.digit,
          previousValues: [...state.previousValues, state.currentOperand],
        };
      }
      if (payload?.digit === "." && state.currentOperand?.includes("."))
        return state;
      if (payload?.digit === "0" && state.currentOperand === "0") return state;
      if (payload?.digit === "+/-") {
        if (state.currentOperand === null) return state;
        const string = state.currentOperand?.toString();
        const toggleNegative = state.currentOperand.startsWith("-")
          ? string.substring(1)
          : `-${string}`;
        return {
          ...state,
          currentOperand: toggleNegative,
        };
      }
      if (state.currentOperand?.length > 8) return state;
      if (
        state.currentOperand === "0" &&
        payload?.digit !== "0" &&
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
      if (state.previousOperand === null)
        return {
          ...state,
          operation: payload?.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };

      if (state.currentOperand === null)
        return {
          ...state,
          operation: payload?.operation,
        };

      return state;

    case CLEAR_ALL:
      return defaultState;

    case EVAL:
      if (state.operation === null || state.previousOperand === null)
        return state;

      if (state.previousValues?.length > 10) {
        const array = state.previousValues.slice(
          0,
          1,
          `${state.previousOperand}${state.operation}${state.currentOperand}`
        );
        return {
          ...state,
          operation: null,
          previousOperand: null,
          currentOperand: evaluate(state),
          overwrite: true,
          previousValues: [...array],
        };
      }
      return {
        ...state,
        operation: null,
        previousOperand: null,
        currentOperand: evaluate(state),
        overwrite: true,
        previousValues: [
          ...state.previousValues,
          `${state.previousOperand}${state.operation}${state.currentOperand}`,
        ],
      };

    default:
      return state;
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const current = parseFloat(currentOperand);
  const previous = parseFloat(previousOperand);
  if (isNaN(current) || isNaN(previous)) return "0";
  let expression = "0";
  switch (operation) {
    case "+":
      expression = current + previous;
      break;
    case "-":
      expression = previous - current;
      break;
    case "/":
      expression = previous / current;
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
