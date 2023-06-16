import styled from "styled-components";
import { FaSadCry } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.h2`
  font-size: 50px;
  font-weight: bold;
  margin: 0 10px;
`;

export default function NoData() {
  return (
    <Container>
      <FaSadCry size={"40px"} />
      <Text>No Data</Text>
      <FaSadCry size={"40px"} />
    </Container>
  );
}
