import styled from "styled-components";

import { displayCenter } from "../../../styles/displays";
import { activeShadow, buttonShadow } from "../../../styles/shadows";

type ButtonType = {
  width: string;
  height: string;
  fontSize: string;
  content?: string;
  onClick?: () => void;
};

const Container = styled.div<ButtonType>`
  ${displayCenter}
  ${buttonShadow}

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  border-radius: 2px;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  background-color: ${(props) => props.theme.button.bgColor};
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.button.hoverColor};
  }

  &:active {
    ${activeShadow}
  }
`;

export default function ButtonDiv(props: ButtonType) {
  return (
    <Container
      width={props.width}
      height={props.height}
      fontSize={props.fontSize}
      onClick={props.onClick}
    >
      {props.content}
    </Container>
  );
}
