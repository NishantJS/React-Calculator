import { useReducer } from "react";
import Buttons from "./Buttons";
import "./style/main.scss";
import { reducer } from "./reducer";

export const defaultState = {
  currentOperand: "0",
  previousOperand: null,
  operation: null,
  overwrite: false,
};

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    defaultState
  );

  console.log({ currentOperand, previousOperand, operation });

  return (
    <section>
      <div className="calculator">
        <div className="display">
          <div className="previous_output">{currentOperand}</div>
          <div className="current_output">
            {previousOperand} {operation}
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
