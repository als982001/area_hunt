import styled from "styled-components";
import { RiErrorWarningFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { displayCenter, displayStartCenter } from "../styles/displays";

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
  ${displayStartCenter}
`;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Div>
        <RiErrorWarningFill size={"100px"} />
        <Span>페이지를 찾지 못했습니다.</Span>
      </Div>
      <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        메인화면으로...
      </span>
    </Container>
  );
}
