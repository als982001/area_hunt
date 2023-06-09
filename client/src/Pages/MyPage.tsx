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
  min-width: 800px;
  width: 70%;
  height: 500px;
  border: 2px solid black;
  border-radius: ${(props) => props.theme.borderRadius};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  padding: 0 50px;
`;

const UserIcon = styled.div<{ bgImage: string }>`
  flex: 1 0 auto;
  height: 80%;
  background-color: pink;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  ${borderRadius20px}
`;

const Infos = styled.div`
  flex: 1 0 auto;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  ${borderRadius20px}
`;

const InfoSpace = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;
  height: 50px;
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
  const [isLoading, setIsLoading] = useState(false);
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
        <UserIcon bgImage="https://cdn.pixabay.com/photo/2016/11/19/18/57/godafoss-1840758_1280.jpg" />
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
            <Info>{userState.userInfo?.callNumber}</Info>
          </InfoSpace>
          <InfoSpace>
            <Label>이름</Label>
            <Info>{userState.userInfo?.email}</Info>
          </InfoSpace>
        </Infos>
      </Container>
    </Wrapper>
  );
}
