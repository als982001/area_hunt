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
  ${border1px}
  ${buttonShadow}


  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: white;
  cursor: pointer;
  left: ${(props) => props.left};
  right: ${(props) => props.right};

  @media screen and (max-width: 1000px) {
    left: ${(props) => props.left !== "null" && "0"};
    right: ${(props) => props.right !== "null" && "0"};
  }

  &:active {
    ${activeShadow}
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
