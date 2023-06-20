import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import styled from "styled-components";

interface FormValues {
  name: string;
  address: string;
  location: string;
  content: string;
}

interface IStyle {
  width: string;
  height: string;
  placeholder: string;
  type: string;
}

const Input = styled.input<IStyle>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

function RegistInput(props: UseControllerProps<FormValues> & IStyle) {
  const { field, fieldState } = useController(props);

  return (
    <Input
      {...field}
      width={props.width}
      height={props.height}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default RegistInput;
