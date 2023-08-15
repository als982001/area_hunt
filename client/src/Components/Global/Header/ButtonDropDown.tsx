import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { RootState } from "../../../Redux/Stores";
import { handleLogout } from "../../../Redux/Actions";

import MenuButton from "../Buttons/MenuButton";
import { toast } from "react-toastify";
import { logout } from "../../../utils/memberFunctions";

const Wrapper = styled.div`
  width: 120px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  @media screen and (min-width: 1001px) {
    // 1001px부터 시작
    display: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ButtonDropDown() {
  const [drop, setDrop] = useState(false);

  const userState = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSetDrop = (isDrop: boolean) => {
    setDrop((prev) => isDrop);
  };

  const startLogout = async () => {
    const result = await logout();

    if (result.status === 205) {
      toast.success(result.data);
      dispatch(handleLogout());
      navigate("/");
    } else {
      toast.error("로그아웃에 실패했습니다.");
      return;
    }

    return;
  };

  return (
    <Wrapper>
      <MenuButton
        width="120px"
        height="40px"
        fontSize="14px"
        onClick={() => handleSetDrop(!drop)}
      >
        {drop ? "접기" : "펼치기"}
      </MenuButton>
      {drop &&
        (userState.login ? (
          <Buttons>
            <Link to="/regist">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                등록하기
              </MenuButton>
            </Link>
            <Link to="/list">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                리스트
              </MenuButton>
            </Link>
            <Link to="/locations">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                지역별
              </MenuButton>
            </Link>
            <Link to="/mypage">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                내정보
              </MenuButton>
            </Link>
            <MenuButton
              width="120px"
              height="40px"
              fontSize="14px"
              onClick={() => startLogout()}
            >
              로그아웃
            </MenuButton>
          </Buttons>
        ) : (
          <Buttons>
            <Link to="/list">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                리스트
              </MenuButton>
            </Link>
            <Link to="/locations">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                지역별
              </MenuButton>
            </Link>
            <Link to="/join">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                회원가입
              </MenuButton>
            </Link>
            <Link to="/login">
              <MenuButton
                margin="2px 0"
                width="120px"
                height="40px"
                fontSize="14px"
              >
                로그인
              </MenuButton>
            </Link>
          </Buttons>
        ))}
    </Wrapper>
  );
}
