import React from "react";
import styled from "styled-components";
import { useController, UseControllerProps } from "react-hook-form";

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
  outline: none;
  border: 1px solid #e5e7eb;
  margin: 8px 0;
  background-color: #fff;
  padding: 15px;
  padding-right: 45px;
  font-size: 15px;
  line-height: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

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
