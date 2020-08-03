import { PanelState } from "./PanelContext";
import { useEffect, useState } from "react";

// custom hook for reporting comparison errors
export function useThreshold(state: PanelState, columnNumber: number) {
  const low = state["low"][columnNumber];
  const high = state["high"][columnNumber];

  const [error, setError] = useState("");

  const canCompare = !low.error && !high.error;

  useEffect(() => {
    if (canCompare && Number(low.value) < Number(high.value)) {
      setError(`column ${columnNumber} low must be greater than high`);
    } else {
      setError("");
    }
  }, [low.value, high.value, canCompare, columnNumber]);

  return error;
}
