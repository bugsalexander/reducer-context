import React, { useState } from "react";
import { useImmerReducer } from "use-immer";
import {
  PanelContext,
  PanelState,
  initialContextState,
  Payload,
} from "./PanelContext";
import { Column } from "./Column";
import styled from "styled-components";

interface PanelProps {}

enum LevelValues {
  One = "one",
  Two = "two",
  Three = "three",
}

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function Panel(props: PanelProps) {
  const [state, dispatch] = useImmerReducer(
    contextReducter,
    initialContextState()
  );
  const [level, setLevel] = useState<string>(LevelValues.One);

  return (
    <div className="panel">
      <select defaultValue={level} onChange={(e) => setLevel(e.target.value)}>
        <option value={LevelValues.One}>{LevelValues.One}</option>
        <option value={LevelValues.Two}>{LevelValues.Two}</option>
        <option value={LevelValues.Three}>{LevelValues.Three}</option>
      </select>

      <PanelContext.Provider value={{ state, dispatch }}>
        <Horizontal>
          {[0, 1, 2].map((n) => (
            <Column columnNumber={n} key={n} />
          ))}
        </Horizontal>
      </PanelContext.Provider>
      <ul>
        {getErrors(state).map((e) => (
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

function contextReducter(state: PanelState, payload: Payload) {
  const { type, columnNumber, value } = payload;
  const target = state[type][columnNumber];

  target.value = value;
  if (isFinite(Number(value))) {
    target.error = "";
  } else if (!isFinite(Number(value))) {
    target.error = `column ${columnNumber} ${type} must be a number`;
  }
}
