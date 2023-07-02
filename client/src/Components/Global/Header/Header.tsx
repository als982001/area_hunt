import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { inputShadow } from "../../../styles/shadows";
import MainLogo from "../Logos/MainLogo";
import { RootState } from "../../../Redux/Stores";
import { handleLogout } from "../../../Redux/Actions";
import { getItemsByKeyword } from "../../../utils/itemFunctions";
import ButtonDropDown from "./ButtonDropDown";
import {
  displayCenter,
  displayEndCenter,
  gridCenter,
} from "../../../styles/displays";
import MenuButton from "../Buttons/MenuButton";

interface IProps {
  keyword: string;
  handleSetKeyword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetSearchResult: (result: IArea[]) => void;
  setSearchFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.header`
  ${gridCenter}

  width: 100%;
  height: 80px;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  padding-top: 20px;
  background-color: #e3f4f4;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Top = styled.form`
  ${gridCenter}

  grid-template-columns: 1fr 4fr 4fr;
  width: 80%;
  position: relative;

  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr 1fr;
  }
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
  border: 1px solid #e5e7eb;
  background-color: #fff;
  padding: 15px;
  padding-right: 45px;
  padding-left: 50px;
  line-height: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 17px;
  outline: none;
  border: none;
  border-radius: 5px;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Buttons = styled.div`
  height: 100%;
  ${displayEndCenter}

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

export default function Header({
  keyword,
  handleSetKeyword,
  handleSetSearchResult,
  setSearchFinished,
}: IProps) {
  const userState = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartLogout = () => {
    alert("로그아웃 했습니다.");
    dispatch(handleLogout());
    navigate("/");
    return;
  };

  const handleEnterKeyword = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const result = await getItemsByKeyword(keyword);

      handleSetSearchResult(result);
      setSearchFinished(true);

      navigate("/list");
    }
  };

  return (
    <Container>
      <Top
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <MainLogo logoSize={"40px"} />
        <Search>
          <HiMagnifyingGlass
            size={"30px"}
            style={{ position: "absolute", left: "10px" }}
          />
          <Input
            onChange={handleSetKeyword}
            placeholder="이름을 검색해보세요."
            onKeyDown={handleEnterKeyword}
          />
        </Search>
        <Buttons>
          {userState.login ? (
            <>
              <Link to="/regist">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  등록하기
                </MenuButton>
              </Link>
              <Link to="/list">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  리스트
                </MenuButton>
              </Link>
              <Link to="/mypage">
                <MenuButton
                  margin="0 10px"
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
                onClick={() => handleStartLogout()}
              >
                로그아웃
              </MenuButton>
            </>
          ) : (
            <>
              <Link to="/list">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  리스트
                </MenuButton>
              </Link>
              <Link to="join">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  회원가입
                </MenuButton>
              </Link>
              <Link to="login">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  로그인
                </MenuButton>
              </Link>
            </>
          )}
        </Buttons>
        <ButtonDropDown />
      </Top>
    </Container>
  );
}
