import styled from "styled-components";

import { AiOutlineArrowUp } from "react-icons/ai";
import { BsFillRocketFill } from "react-icons/bs";

interface IProps {
  onClick: () => void;
}

const Button = styled.button`
  width: 140px;
  height: 50px;
  background: linear-gradient(to top, #00154c, #12376e, #23487f);
  color: #fff;
  border-radius: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  margin: 50px auto;

  & span {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: top 0.5s;
  }

  &:hover .text-one {
    top: -100%;
  }

  &:hover .text-two {
    top: 50%;
  }
`;

const TextOne = styled.span`
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const TextTwo = styled.span`
  position: absolute;
  width: 100%;
  top: 150%;
  left: 0;
  transform: translateY(-50%);
`;

export default function ToTopButton(props: IProps) {
  return (
    <Button onClick={props.onClick}>
      <TextOne className="text-one">
        <AiOutlineArrowUp size={"30px"} />
      </TextOne>
      <TextTwo className="text-two">
        <BsFillRocketFill size={"30px"} />
      </TextTwo>
    </Button>
  );
}
