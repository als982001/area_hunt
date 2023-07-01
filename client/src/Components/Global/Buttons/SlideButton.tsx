import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";

import { displayCenter } from "../../../styles/displays";
import { absoluteVerticalCenter } from "../../../styles/positions";
import { border1px } from "../../../styles/styles";
import { activeShadow, buttonShadow } from "../../../styles/shadows";

interface IProps {
  left?: string;
  right?: string;
  isBefore?: boolean;
  onClick: () => void;
}

const Button = styled.button<{ left: string; right: string }>`
  ${displayCenter}
  ${absoluteVerticalCenter}
  box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5), inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2), 0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 3px 4px -1px rgba(255, 255, 255, 0.2), inset 0 0 5px 1px rgba(255, 255, 255, 0.8), inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);

  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: white;
  cursor: pointer;
  border: none;
  outline: none;
  left: ${(props) => props.left};
  right: ${(props) => props.right};

  @media screen and (max-width: 1000px) {
    left: ${(props) => props.left !== "null" && "0"};
    right: ${(props) => props.right !== "null" && "0"};
  }

  &:active {
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4),
      inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6),
      inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }
`;

export default function SlideButton({
  left,
  right,
  isBefore,
  onClick,
}: IProps) {
  return (
    <Button onClick={onClick} left={left || "null"} right={right || "null"}>
      {isBefore ? <GrPrevious size={"25px"} /> : <GrNext size={"25px"} />}
    </Button>
  );
}
