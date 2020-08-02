import { createContext, Dispatch } from "react";

export interface PanelState {
  top: Array<ValueError>;
  high: Array<ValueError>;
  low: Array<ValueError>;
}

export interface Payload {
  type: "low" | "high" | "top";
  columnNumber: number;
  value: string;
}

export interface PanelContext {
  state: PanelState;
  dispatch: Dispatch<Payload>;
}

export interface ValueError {
  value: string;
  error: string;
}

export const ec = (value: string): ValueError => ({ value, error: "" });

export function initialContextState(): PanelState {
  return {
    top: [ec("1"), ec("2"), ec("3")],
    high: [ec("80"), ec("60"), ec("40")],
    low: [ec("90"), ec("80"), ec("70")],
  };
}

export const PanelContext = createContext<PanelContext>({
  state: initialContextState(),
  dispatch: (p: Payload) => null,
});
