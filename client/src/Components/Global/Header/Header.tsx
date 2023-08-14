import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { inputShadow } from "../../../styles/shadows";

import MainLogo from "../Logos/MainLogo";
import { RootState } from "../../../Redux/Stores";
import ButtonDropDown from "./ButtonDropDown";
import {
  displayCenter,
  displayEndCenter,
  gridCenter,
} from "../../../styles/displays";
import MenuButton from "../Buttons/MenuButton";
import useHeader from "../../../Hooks/useHeader";
import UserButton from "./UserButton";

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

const Top = styled.section`
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

export default function Header() {
  const userState = useSelector((state: RootState) => state.userReducer);

  const { keyword, handleSetKeyword, handleGetPlacesByKeyword } = useHeader();

  return (
    <Container>
      <Top>
        <MainLogo logoSize={"40px"} />
        <Search>
          <HiMagnifyingGlass
            size={"30px"}
            style={{ position: "absolute", left: "10px" }}
          />
          <Input
            value={keyword}
            onChange={handleSetKeyword}
            placeholder="이름을 검색해보세요."
            onKeyDown={handleGetPlacesByKeyword}
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
              <Link to="/locations">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  지역별
                </MenuButton>
              </Link>
              <UserButton />
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
              <Link to="/locations">
                <MenuButton
                  margin="0 10px"
                  width="120px"
                  height="40px"
                  fontSize="14px"
                >
                  지역별
                </MenuButton>
              </Link>
              <UserButton />
            </>
          )}
        </Buttons>
        <ButtonDropDown />
      </Top>
    </Container>
  );
}
