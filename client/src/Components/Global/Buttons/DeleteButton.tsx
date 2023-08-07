import styled from "styled-components";
import { displayCenter } from "../../../styles/displays";
import { AiFillDelete } from "react-icons/ai";

interface IProps {
  size: string;
  onClick: () => any;
}

const Container = styled.section`
  ${displayCenter}

  cursor: pointer;
  border-radius: 100%;
  border: 1px solid black;
  padding: 5px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

export default function DeleteButton({ size, onClick }: IProps) {
  return (
    <Container>
      <AiFillDelete onClick={onClick} size={size} />
    </Container>
  );
}
