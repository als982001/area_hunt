import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { borderRadius20px, centerImage } from "../styles/styles";
import { displayCenter, displayCenterStart } from "../styles/displays";
import { getPhoneForm } from "../utils/functions";

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
`;

const Card = styled.div`
  overflow: visible;
  position: relative;
  width: 450px;
  height: 600px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  margin-top: 50px;

  &::before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: #fff;
    transition: 0.5s;
    z-index: -99;
  }

  &:hover:before {
    transform: rotate(20deg);
  }

  &:hover:after {
    transform: rotate(10deg);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  }

  &:hover .imgbox {
    bottom: 200px;
  }
`;

const ImgBox = styled.div`
  ${borderRadius20px}

  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  background: #222;
  transition: 0.5s;
  z-index: 1;
`;

const Img = styled.div<{ bgImage: string }>`
  ${borderRadius20px}
  ${centerImage}

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Details = styled.div`
  position: absolute;
  left: -10px;
  right: 0;
  bottom: 5px;
  height: 180px;
  text-align: center;
  text-transform: uppercase;
  display: grid;
  grid-template-rows: 2fr 1fr 1fr 1fr;
`;

const Title = styled.h2`
  ${displayCenter}

  font-weight: 600;
  font-size: 20px;
  color: #777;
`;

const Caption = styled.span`
  ${displayCenter}

  font-weight: 500;
  font-size: 16px;
  color: #4158d0;
  display: block;
  margin-top: 5px;
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
      <Card>
        <ImgBox className="imgbox">
          <Img
            bgImage={
              userState.userInfo.userImg.path.includes("pixabay")
                ? `${userState.userInfo.userImg.path}`
                : `${process.env.REACT_APP_BACK}/${userState.userInfo.userImg.path}`
            }
          ></Img>
        </ImgBox>
        <Details>
          <Title>{`ID: ${userState.userInfo.userId}`}</Title>
          <Caption>{`이름: ${userState.userInfo?.name}`}</Caption>
          <Caption>{getPhoneForm(userState.userInfo.phone)}</Caption>
          <Caption>{userState.userInfo.email}</Caption>
        </Details>
      </Card>
    </Wrapper>
  );
}
