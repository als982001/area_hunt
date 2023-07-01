import styled from "styled-components";
import { BlueButton } from "../../../styles/styles";

interface IButton {
  width: string;
  height: string;
  fontSize: string;
  content?: string;
  children: string;
}

const Button = styled.button<IButton>`
  ${BlueButton}

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
`;

export default function SubmitButton(props: IButton) {
  return (
    <Button width={props.width} height={props.height} fontSize={props.fontSize}>
      {props.children}
    </Button>
  );
}
