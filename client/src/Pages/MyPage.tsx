import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { border2px, borderRadius20px, centerImage } from "../styles/styles";
import {
  displayCenterStart,
  displayStartCenter,
  gridCenter,
} from "../styles/displays";

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
`;

const Container = styled.div`
  ${border2px}
  ${borderRadius20px}
  ${gridCenter}

  width: 70%;
  height: 500px;
  margin-top: 50px;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    gap: 0;
    padding: 0 10px;
  }
`;

const UserIcon = styled.div<{ bgImage: string }>`
  ${centerImage}
  ${borderRadius20px}

  flex: 1 0 auto;
  height: 80%;
`;

const Infos = styled.div`
  ${borderRadius20px}
  ${gridCenter}

  flex: 1 0 auto;
  height: 80%;
  grid-template-rows: repeat(4, 1fr);
  gap: 0;
  border: 2px solid black;
`;

const InfoSpace = styled.div`
  ${displayStartCenter}

  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  ${displayStartCenter}

  width: 100px;
  height: 50px;
  padding-left: 20px;
  font-weight: bold;
`;

const Info = styled.h4`
  ${displayStartCenter}

  font-weight: 400;
`;

export default function MyPage() {
  const userState = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.login === false) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <UserIcon
          bgImage={
            userState.userInfo.userImg.path.includes("pixabay")
              ? `${userState.userInfo.userImg.path}`
              : `${process.env.REACT_APP_BACK}/${userState.userInfo.userImg.path}`
          }
        />
        <Infos>
          <InfoSpace>
            <Label>ID</Label>
            <Info>{userState.userInfo?.userId}</Info>
          </InfoSpace>
          <InfoSpace>
            <Label>이름</Label>
            <Info>{userState.userInfo?.name}</Info>
          </InfoSpace>
          <InfoSpace>
            <Label>전화번호</Label>
            <Info>{userState.userInfo?.phone}</Info>
          </InfoSpace>
          <InfoSpace>
            <Label>이메일</Label>
            <Info>{userState.userInfo?.email}</Info>
          </InfoSpace>
        </Infos>
      </Container>
    </Wrapper>
  );
}
