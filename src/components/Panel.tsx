import React, { useState, useMemo } from "react";
import { useImmerReducer } from "use-immer";
import { PanelContext, PanelState, Payload } from "./PanelContext";
import Column from "./Column";
import styled from "styled-components";

interface PanelProps {
  level: LevelValues;
  initialState: PanelState;
}

export enum LevelValues {
  One = "One",
  Two = "Two",
  Three = "Three",
}

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Panel(props: PanelProps) {
  const [state, dispatch] = useImmerReducer(stateReducer, props.initialState);
  const [level, setLevel] = useState<string>(props.level);

  const errors = getErrors(state);

  // avoid creating a new object every single time
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <div className="panel">
      <select defaultValue={level} onChange={(e) => setLevel(e.target.value)}>
        <option value={LevelValues.One}>{LevelValues.One}</option>
        <option value={LevelValues.Two}>{LevelValues.Two}</option>
        <option value={LevelValues.Three}>{LevelValues.Three}</option>
      </select>

      <PanelContext.Provider value={contextValue}>
        <Horizontal>
          {[0, 1, 2].map((n) => (
            <Column columnNumber={n} key={n} />
          ))}
        </Horizontal>
      </PanelContext.Provider>
      <button
        disabled={errors.length > 0}
        onClick={() => {
          console.log({ state, level });
          alert("saved!");
        }}
      >
        save
      </button>
      <ul>
        {errors.map((e) => (
          <li>{e}</li>
        ))}
      </ul>
    </div>
  );
}

function getErrors(state: PanelState): Array<string> {
  const { top, high, low } = state;
  const getError = (v: { error: any }) => v.error;

  return [
    ...top.map(getError),
    ...high.map(getError),
    ...low.map(getError),
  ].filter((e) => e);
}

function stateReducer(state: PanelState, payload: Payload) {
  const { type, columnNumber, value } = payload;
  const target = state[type][columnNumber];

  // set the value
  target.value = value;

  // set the error
  const wrap = (message: string) =>
    message ? `column ${columnNumber} ${type} ${message}` : "";
  switch (type) {
    case "top":
      target.error = wrap(validate(value, checkNumber, checkNonNegative));
      break;
    case "high":
      target.error = wrap(validate(value, checkNumber, checkPercent));
      break;
    case "low":
      target.error = wrap(validate(value, checkNumber, checkPercent));
      break;
  }
}

// validates a value with some validators (strategy pattern)
// returns the first error message produced, checking in order
function validate(
  value: string,
  ...validators: Array<(v: string) => string>
): string {
  for (const f of validators) {
    const message = f(value);
    if (message) return message;
  }
  return "";
}

// produces a validator
// if the condition produces true, return the message
function check(
  condition: (v: string) => boolean,
  message: (v: string) => string
): (v: string) => string {
  return (v: string) => {
    if (condition(v)) {
      return message(v);
    } else {
      return "";
    }
  };
}

const checkNumber = check(
  (v) => !isFinite(Number(v)),
  (v) => `must be a number`
);

const checkNonNegative = check(
  (v) => Number(v) < 0,
  (v) => `must be non-negative`
);

// assumes value has passed isFinite
const checkPercent = check(
  (v) => Number(v) < 0 || 100 < Number(v),
  (v) => `must be between 0 - 100 inclusive`
);
