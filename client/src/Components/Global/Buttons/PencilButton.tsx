import styled from "styled-components";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { displayCenter } from "../../../styles/displays";

interface IProps {
  size: string;
  onClick: () => void;
}

const Container = styled.section`
  ${displayCenter}

  margin-top: 20px;
  cursor: pointer;
  border-radius: 100%;
  border: 1px solid black;
  padding: 5px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

export default function PencilButton(props: IProps) {
  return (
    <Container>
      <HiOutlinePencilAlt onClick={props.onClick} size={props.size} />
    </Container>
  );
}
