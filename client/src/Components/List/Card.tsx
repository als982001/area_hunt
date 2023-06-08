import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 10px;
  padding-bottom: 60px;
  border-radius: ${(props) => props.theme.borderRadius};

  &::after {
    content: "보러 가기!";
    display: flex;
    align-items: center;
    justify-content: start;
    width: 80%;
    height: 70px;
    padding-left: 20px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
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
`;

const Image = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border-radius: ${(props) => props.theme.borderRadius};

  /*
  background-image:
  background-size: cover;
  background-position: center;
  */
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

interface IProps {
  id: string;
}

export default function Card(props: IProps) {
  const naviage = useNavigate();

  const showDetail = () => {
    naviage(`/${props.id}`);
  };

  return (
    <Container onClick={showDetail}>
      <Image />
      <Title>Cool Chair</Title>
      <Location>$100</Location>
    </Container>
  );
}
