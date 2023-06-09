import styled from "styled-components";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { displayCenter } from "../styles/displays";

const Container = styled.div`
  ${displayCenter}
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Span = styled.span`
  font-size: 50px;
  margin-left: 50px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

export default function Main() {
  const navigate = useNavigate();

  return (
    <Container>
      <Div>
        <RiErrorWarningFill size={"100px"} />
        <Span>등록된 지역 보기</Span>
      </Div>
      <span style={{ cursor: "pointer" }} onClick={() => navigate("/list")}>
        확인하기...
      </span>
    </Container>
  );
}
