import styled from "styled-components";

import { displayCenter } from "../../../styles/displays";
import { activeShadow, buttonShadow } from "../../../styles/shadows";
import { BlueButton } from "../../../styles/styles";

type ButtonType = {
  width: string;
  height: string;
  fontSize: string;
  content?: string;
};

const Container = styled.button<ButtonType>`
  ${displayCenter}
  ${buttonShadow}
  ${BlueButton}

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
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
