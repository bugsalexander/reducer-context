import styled from "styled-components";
import React from "react";

const InputContainer = styled.div``;

interface InputProps {
  value: string;
  onChange?: (value: string) => void;
}

export function Input(props: InputProps) {
  return (
    <InputContainer>
      <input
        value={props.value}
        onChange={(e) =>
          props.onChange ? props.onChange(e.target.value) : undefined
        }
      ></input>
    </InputContainer>
  );
}
