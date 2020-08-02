import React from "react";
import "./App.css";
import Panel, { LevelValues } from "./components/Panel";
import { initialContextState } from "./components/PanelContext";

function App() {
  return (
    <div>
      <Panel
        initialState={initialContextState()}
        level={LevelValues.One}
      ></Panel>
    </div>
  );
}

export default App;
