import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { displayCenter, displayStartCenter } from "../../styles/displays";
import { absoluteHorizontalCenter } from "../../styles/positions";
import { IPlace } from "../../utils/types";

interface IProps {
  place: IPlace;
  mypage: boolean;
}

const Container = styled.div<{ mypage: boolean }>`
  ${displayCenter}

  width: 200px;
  height: 300px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  padding-bottom: 60px;
  border-radius: ${(props) => props.theme.borderRadius};
  position: relative;
  margin: ${(props) => props.mypage === false && " 0 50px"};

  &::after {
    ${displayStartCenter}
    ${absoluteHorizontalCenter}

    content: "보러 가기!";
    width: 80%;
    height: 70px;
    padding-left: 20px;
    bottom: -60px;
    background-color: #00ac7c;
    color: #fff;
    transition: all 80ms;
    font-weight: 600;
    text-transform: uppercase;
    opacity: 0;
    border-radius: ${(props) => props.theme.borderRadius};
  }

  &:hover {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }

  &:hover::after {
    bottom: 0;
    opacity: 1;
  }

  &:active {
    transform: scale(0.9);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }

  &:active::after {
    transform: scale(0.8);
  }

  @media screen and (max-width: 1000px) {
    width: 120px;
    height: 180px;
    margin: 0 20px;
  }

  @media screen and (max-width: 450px) {
    margin: 10px 0;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border-radius: ${(props) => props.theme.borderRadius};
  background: black;
`;

const Title = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  position: absolute;
  left: 12px;
  bottom: 30px;
  font-weight: 400;
  color: #000;
`;

const Location = styled.span`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 15px;
  position: absolute;
  left: 12px;
  bottom: 12px;
  color: #000;
`;

export default function Card({ place, mypage }: IProps) {
  const naviage = useNavigate();

  const showDetail = () => {
    naviage(`/${place._id.toString()}`);
  };

  return (
    <Container onClick={showDetail} mypage={mypage}>
      <Image src={place.imageUrl} alt="Image" />
      <Title>{place.name}</Title>
      <Location>{place.location}</Location>
    </Container>
  );
}
