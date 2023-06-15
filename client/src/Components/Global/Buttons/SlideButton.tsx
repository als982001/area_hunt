import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";

interface IProps {
  left?: string;
  right?: string;
  isBefore?: boolean;
  onClick: () => void;
}

const Button = styled.button<{ left: string; right: string }>`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  &:active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
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
