import React, { useContext } from "react";
import styled from "styled-components";
import Input from "./Input";
import { PanelContext } from "./PanelContext";

interface ColumnProps {
  columnNumber: number;
}

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Column(props: ColumnProps) {
  const { columnNumber } = props;
  const { state, dispatch } = useContext(PanelContext);
  const { top, high, low } = state;

  return (
    <ColumnContainer>
      <Input
        value={top[columnNumber].value}
        onChange={(value) => dispatch({ columnNumber, type: "top", value })}
      />
      <Input
        value={high[columnNumber].value}
        onChange={(value) => dispatch({ columnNumber, type: "high", value })}
      />
      <Input
        value={low[columnNumber].value}
        onChange={(value) => dispatch({ columnNumber, type: "low", value })}
      />
    </ColumnContainer>
  );
}
