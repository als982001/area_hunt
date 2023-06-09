import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 10px;
`;

const Img = styled.img<{ onClick?: () => void }>`
  width: 200px;
  height: 200px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Infos = styled.div`
  flex-grow: 1;
  height: 200px;
  display: grid;
  grid-template-rows: 1fr 3fr 1fr;
`;

const Info = styled.div<{ alignItems: string }>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: start;
  padding: 10px 0;
  padding-left: 20px;
  font-size: 17px;
  font-weight: 500;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

const Modal = styled.img`
  min-width: 800px;
  width: 70%;
  height: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  z-index: 10;
  border-radius: ${(props) => props.theme.borderRadius};
`;

export default function VisitRecord() {
  const [bigImg, setBigImg] = useState(false);

  const handleBigImg = (isBig: boolean) => {
    setBigImg((prev) => isBig);
  };

  return (
    <>
      <Container>
        <Img
          src="https://cdn.pixabay.com/photo/2023/05/28/14/22/naxos-8023806_1280.jpg"
          alt="visit_img"
          onClick={() => handleBigImg(true)}
        />
        <Infos>
          <Info alignItems="center">익명의 이용자</Info>
          <Info alignItems="start">여기 정말 좋은 곳이네요!</Info>
          <Info alignItems="center">2023/06/09</Info>
        </Infos>
      </Container>
      {bigImg && (
        <>
          <Overlay onClick={() => handleBigImg(false)} />
          <Modal
            src="https://cdn.pixabay.com/photo/2023/05/28/14/22/naxos-8023806_1280.jpg"
            alt="big_visit_img"
          />
        </>
      )}
    </>
  );
}
