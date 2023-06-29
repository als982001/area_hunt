import styled from "styled-components";

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
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  margin: ${(props) => props.margin || "none"};
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: rgb(6, 14, 131);
  background: linear-gradient(
    0deg,
    rgba(6, 14, 131, 1) 0%,
    rgba(12, 25, 180, 1) 100%
  );
  border: none;

  &:hover {
    background: rgb(0, 3, 255);
    background: linear-gradient(
      0deg,
      rgb(0, 17, 255) 0%,
      rgba(2, 126, 251, 1) 100%
    );
  }
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
