import styled from "styled-components";
import { BlueButton } from "../../../styles/styles";

interface IProps {
  children: string;
  width: string;
  height: string;
  fontSize: string;
  margin?: string;
  onClick?: () => void;
}

const Button = styled.button<{
  width: string;
  height: string;
  fontSize: string;
  margin?: string;
}>`
  ${BlueButton}

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin || "none"};
`;

export default function MenuButton(props: IProps) {
  return (
    <Button
      onClick={props.onClick}
      width={props.width}
      height={props.height}
      fontSize={props.fontSize}
      margin={props.margin}
    >
      {props.children}
    </Button>
  );
}
