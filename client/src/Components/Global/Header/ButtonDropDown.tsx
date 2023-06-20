import styled, { css } from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../../../Redux/Stores";
import { handleLogout } from "../../../Redux/Actions";
import { displayCenter } from "../../../styles/displays";
import { activeShadow, buttonShadow } from "../../../styles/shadows";

const buttonStyle = css`
  ${displayCenter}

  width: 120px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.button.bgColor};
  font-weight: 500;
`;

const Wrapper = styled.div`
  width: 120px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;

  @media screen and (min-width: 1001px) {
    // 1001px부터 시작
    display: none;
  }
`;

const Container = styled.div<{ drop: number }>`
  ${buttonStyle}

  margin-bottom: 10px;

  &:active {
    ${activeShadow}
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.div`
  ${buttonStyle}
  ${buttonShadow}

  &:active {
    ${activeShadow}
  }
`;

export default function ButtonDropDown() {
  const [drop, setDrop] = useState(false);

  const userState = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSetDrop = (isDrop: boolean) => {
    setDrop((prev) => isDrop);
  };

  const handleStartLogout = () => {
    alert("로그아웃 했습니다.");
    dispatch(handleLogout());
    navigate("/");
    return;
  };

  return (
    <Wrapper>
      <Container drop={drop ? 1 : 0} onClick={() => handleSetDrop(!drop)}>
        {drop ? "접기" : "펼치기"}
      </Container>
      {drop &&
        (userState.login ? (
          <Buttons>
            <Link to="/regist">
              <Button>등록하기</Button>
            </Link>
            <Link to="/list">
              <Button>리스트</Button>
            </Link>
            <Link to="/mypage">
              <Button>내 정보</Button>
            </Link>
            <Button onClick={() => handleStartLogout()}>로그아웃</Button>
          </Buttons>
        ) : (
          <Buttons>
            <Link to="/list">
              <Button>리스트</Button>
            </Link>
            <Link to="/join">
              <Button>회원가입</Button>
            </Link>
            <Link to="/login">
              <Button>로그인</Button>
            </Link>
          </Buttons>
        ))}
    </Wrapper>
  );
}
