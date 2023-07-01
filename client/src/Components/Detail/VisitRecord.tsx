import styled from "styled-components";
import { useState } from "react";

import { border2px, borderRadius20px } from "../../styles/styles";
import { displayStartCenter } from "../../styles/displays";
import { fixedCenter } from "../../styles/positions";
import { defaultShadow } from "../../styles/shadows";

interface IProps {
  record: {
    id: number;
    areaId: number;
    imgPath: string;
    name: string;
    content: string;
    date: string;
  };
  key: string;
}

const Container = styled.div`
  ${displayStartCenter}
  ${borderRadius20px}
  ${defaultShadow}

  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
`;

const Img = styled.img<{ onClick?: () => void }>`
  ${borderRadius20px}

  width: 200px;
  height: 200px;
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
  ${fixedCenter}
  ${borderRadius20px}

  width: 600px;
  height: auto;
  z-index: 10;
`;

export default function VisitRecord(props: IProps) {
  const [bigImg, setBigImg] = useState(false);

  const handleBigImg = (isBig: boolean) => {
    setBigImg((prev) => isBig);
  };

  return (
    <>
      <Container>
        <Img
          src={
            props.record.imgPath.includes("uploads")
              ? `${process.env.REACT_APP_BACK}/${props.record.imgPath}`
              : `${props.record.imgPath}`
          }
          alt="visit_img"
          onClick={() => handleBigImg(true)}
        />
        <Infos>
          <Info alignItems="center">{props.record.name}</Info>
          <Info alignItems="start">{props.record.content}</Info>
          <Info alignItems="center">{props.record.date}</Info>
        </Infos>
      </Container>
      {bigImg && (
        <>
          <Overlay onClick={() => handleBigImg(false)} />
          <Modal
            src={
              props.record.imgPath.includes("uploads")
                ? `${process.env.REACT_APP_BACK}/${props.record.imgPath}`
                : `${props.record.imgPath}`
            }
            alt="big_visit_img"
          />
        </>
      )}
    </>
  );
}
