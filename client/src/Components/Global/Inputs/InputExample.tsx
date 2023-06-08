import styled from "styled-components";
import {
  useController,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

const Wrapper = styled.div<{ error?: boolean }>`
  display: flex;
  border-bottom: ${(props) =>
    props.error ? `1px solid red` : `1px solid black`};
  color: ${(props) => (props.error ? `red` : `black`)};
`;

const Input = styled.input`
  height: 40px;
  border: none;
  outline: none;
`;

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseControllerProps<TFieldValues, TName> {
  type?: string;
  placeholder?: string;
}

function InpuExample<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: InputProps<TFieldValues, TName>) {
  const name = props.name;
  const { field, fieldState } = useController({
    name,
    rules: props.rules,
  });

  return (
    <Wrapper error={fieldState.error && true}>
      <Input {...field} type={props.type} placeholder={props.placeholder} />
      {fieldState.error && fieldState.error.message}
    </Wrapper>
  );
}

export default InpuExample;
