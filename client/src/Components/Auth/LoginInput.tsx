import { UseControllerProps, useController } from "react-hook-form";
import styled from "styled-components";
import { AuthInputStyle } from "../../styles/styles";

interface IProps {
  type: string;
  placeholder: string;
}

interface FormValues {
  userId: string;
  password: string;
}

const Input = styled.input`
  ${AuthInputStyle}
`;

export default function LoginInput(
  props: UseControllerProps<FormValues> & IProps
) {
  const { field, fieldState } = useController(props);

  return <Input {...field} type={props.type} placeholder={props.placeholder} />;
}
