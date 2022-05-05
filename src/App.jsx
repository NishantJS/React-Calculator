import { useReducer, useEffect, useRef } from "react";
import Buttons from "./Buttons";
import "./style/main.scss";
import { reducer } from "./reducer";
import PreviousOutput from "./PreviousOutput";

export const defaultState = {
  currentOperand: "0",
  previousOperand: null,
  operation: null,
  overwrite: false,
  previousValues: [],
};

const App = () => {
  const [
    { currentOperand, previousOperand, operation, previousValues },
    dispatch,
  ] = useReducer(reducer, defaultState);
  const displayRef = useRef(null);

  useEffect(() => {
    const elem = displayRef?.current;
    elem.scrollTop = elem.scrollHeight;
  }, [previousValues]);

  return (
    <section>
      <div className="calculator">
        <div className="display" ref={displayRef}>
          <PreviousOutput previousValues={previousValues} />
          <span>
            {previousOperand} {operation} {currentOperand}
          </span>
        </div>
        <div className="bottom">
          <div className="scroller"></div>
          <div className="buttons">
            <Buttons dispatch={dispatch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
