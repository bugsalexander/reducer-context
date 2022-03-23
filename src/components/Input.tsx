import styled from "styled-components";
import React from "react";

const InputContainer = styled.div``;

interface InputProps {
  value: string;
  onChange?: (value: string) => void;
}

const StyledInput = styled.input`
  background: ${(props) => (props.value === "3" ? "lightgreen" : "inherit")};
`;

export default function Input(props: InputProps) {
  return (
    <InputContainer>
      <StyledInput
        value={props.value}
        onChange={(e) =>
          props.onChange ? props.onChange(e.target.value) : undefined
        }
      ></StyledInput>
    </InputContainer>
  );
}
