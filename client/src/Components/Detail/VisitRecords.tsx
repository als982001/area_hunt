import styled from "styled-components";
import VisitRecord from "./VisitRecord";

const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
`;

interface IProps {
  id: string | number;
}

export default function VisitRecords(props: IProps) {
  return (
    <Container>
      <VisitRecord />
      <VisitRecord />
    </Container>
  );
}
