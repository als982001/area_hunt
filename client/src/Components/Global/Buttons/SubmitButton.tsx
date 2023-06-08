import styled from "styled-components";

interface IButton {
  width: string;
  height: string;
  fontSize: string;
  content?: string;
}

const Button = styled.button<IButton>`
  font-size: ${(props) => props.fontSize};
  padding: 0.5em 2em;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: dodgerblue;
  color: white;
  border-radius: 4px;

  &:hover {
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(30, 144, 255, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;

export default function SubmitButton(props: IButton) {
  return (
    <Button width={props.width} height={props.height} fontSize={props.fontSize}>
      {props.content}
    </Button>
  );
}
