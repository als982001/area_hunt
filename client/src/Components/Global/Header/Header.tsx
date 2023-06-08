import styled from "styled-components";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Button from "../Buttons/Button";
import { displayCenter, displayEnd } from "../../../styles/displays";
import { inputShadow } from "../../../styles/shadows";
import ButtonDiv from "../Buttons/ButtonDiv";
import { Link, useNavigate } from "react-router-dom";
import MainLogo from "../Logos/MainLogo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Stores";
import { handleLogout } from "../../../Redux/Actions";

const Container = styled.header`
  width: 100%;
  height: 120px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  border-bottom: 2px solid red;
  justify-items: center;
`;

const Top = styled.form`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  align-items: center;

  width: 80%;
`;

const Search = styled.div`
  ${displayCenter}

  width: 100%;
  height: 100%;
  position: relative;
`;

const Input = styled.input`
  ${inputShadow}

  width: 100%;
  height: 80%;
  padding-left: 50px;
  font-size: 17px;
  outline: none;
  border: none;
  border-radius: 5px;
`;

const Buttons = styled.div`
  ${displayEnd}
  height: 100%;
`;

const Bottom = styled.div`
  ${displayCenter}

  width: 80%;
`;

export default function Header() {
  const userState = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartLogout = () => {
    alert("로그아웃 했습니다.");
    dispatch(handleLogout());
    navigate("/");
    return;
  };

  return (
    <Container>
      <Top
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Link to="/list">
          <MainLogo logoSize={"40px"} />
        </Link>
        <Search>
          <HiMagnifyingGlass
            size={"30px"}
            style={{ position: "absolute", left: "10px" }}
          />
          <Input placeholder="이름을 검색해보세요." />
        </Search>
        <Buttons>
          {userState.login ? (
            <>
              <Link to="/mypage">
                <Button
                  width="120px"
                  height="40px"
                  fontSize="14px"
                  content="내 정보"
                />
              </Link>
              <ButtonDiv
                width="120px"
                height="40px"
                fontSize="14px"
                content="로그아웃"
                onClick={() => handleStartLogout()}
              />
            </>
          ) : (
            <>
              <Link to="join">
                <Button
                  width="120px"
                  height="40px"
                  fontSize="14px"
                  content="회원가입"
                />
              </Link>
              <Link to="login">
                <Button
                  width="120px"
                  height="40px"
                  fontSize="14px"
                  content="로그인"
                />
              </Link>
            </>
          )}
        </Buttons>
      </Top>
      <Bottom>
        <ButtonDiv
          width="120px"
          height="40px"
          fontSize="14px"
          content="뭐하지1"
        />
        <ButtonDiv
          width="120px"
          height="40px"
          fontSize="14px"
          content="뭐하지2"
        />
        <ButtonDiv
          width="120px"
          height="40px"
          fontSize="14px"
          content="뭐하지3"
        />
      </Bottom>
    </Container>
  );
}
