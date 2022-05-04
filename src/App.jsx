import { useReducer } from "react";
import Buttons from "./Buttons";
import "./style/main.scss";
import { reducer } from "./reducer";

export const defaultState = {
  currentOperand: "0",
  previousOperand: null,
  operation: null,
  overwrite: false,
  lastValues: [],
};

const App = () => {
  const [{ currentOperand, previousOperand, operation, lastValues }, dispatch] =
    useReducer(reducer, defaultState);

  console.log(lastValues);

  return (
    <section>
      <div className="calculator">
        <div className="display">
          {/* <div className="previous_output">{lastValues}</div> */}
          <div className="current_output">
            {previousOperand} {operation} {currentOperand}
          </div>
        </div>
        <div className="buttons">
          <Buttons dispatch={dispatch} />
        </div>
      </div>
    </section>
  );
};

export default App;
