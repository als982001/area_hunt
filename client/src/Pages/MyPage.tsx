import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";
import { borderRadius20px } from "../styles/styles";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 50px;

  width: 70%;
  height: 500px;
  border: 2px solid black;
  border-radius: ${(props) => props.theme.borderRadius};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    gap: 0;
    padding: 0 10px;
  }
`;

const UserIcon = styled.div<{ bgImage: string }>`
  flex: 1 0 auto;
  height: 80%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  ${borderRadius20px}
`;

const Infos = styled.div`
  flex: 1 0 auto;
  height: 80%;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  align-items: center;
  gap: 0;
  border: 2px solid black;
  ${borderRadius20px}
`;

const InfoSpace = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  font-weight: bold;
`;

const Info = styled.h4`
  display: flex;
  justify-content: start;
  align-items: center;
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
          bgImage={`${process.env.REACT_APP_BACK}/${userState.userInfo.userImg.path}`}
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
