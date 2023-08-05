import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";

import { displayCenter } from "../../../styles/displays";
import { absoluteVerticalCenter } from "../../../styles/positions";

interface IProps {
  pos: string;
  isBefore?: boolean;
  onClick: () => void;
}

const Button = styled.button<{ pos: string }>`
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
  left: ${(props) => props.pos === "left" && "100px"};
  right: ${(props) => props.pos === "right" && "100px"};

  @media screen and (max-width: 1000px) {
    left: ${(props) => props.pos === "left" && "50px"};
    right: ${(props) => props.pos === "right" && "50px"};
  }

  @media screen and (max-width: 750px) {
    width: 40px;
    height: 40px;
  }

  &:active {
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4),
      inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6),
      inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }
`;

export default function SlideButton({ pos, isBefore, onClick }: IProps) {
  return (
    <Button onClick={onClick} pos={pos}>
      {isBefore ? <GrPrevious size={"25px"} /> : <GrNext size={"25px"} />}
    </Button>
  );
}
