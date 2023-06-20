import styled from "styled-components";

import { displayCenter } from "../../../styles/displays";
import { activeShadow, buttonShadow } from "../../../styles/shadows";

type ButtonType = {
  width: string;
  height: string;
  fontSize: string;
  content?: string;
};

const Container = styled.button<ButtonType>`
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

  &:hover {
    background-color: ${(props) => props.theme.button.hoverColor};
  }

  &:active {
    ${activeShadow}
  }
`;

export default function Button(props: ButtonType) {
  return (
    <Container
      width={props.width}
      height={props.height}
      fontSize={props.fontSize}
    >
      {props.content}
    </Container>
  );
}
