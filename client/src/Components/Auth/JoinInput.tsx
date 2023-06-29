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
  password2: string;
  name: string;
  phone: string;
  email: string;
}

const Input = styled.input`
  ${AuthInputStyle}
`;

export default function JoinInput(
  props: UseControllerProps<FormValues> & IProps
) {
  const { field, fieldState } = useController(props);

  return <Input {...field} type={props.type} placeholder={props.placeholder} />;
}
