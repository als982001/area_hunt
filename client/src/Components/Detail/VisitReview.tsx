import styled from "styled-components";
import { useState } from "react";

import { borderRadius20px } from "../../styles/styles";
import { displayStartCenter } from "../../styles/displays";
import { fixedCenter } from "../../styles/positions";
import { defaultShadow } from "../../styles/shadows";
import { IReview } from "../../utils/types";

import { CiCircleRemove } from "react-icons/ci";
import useEditReview from "../../Hooks/useEditReview";

interface IProps {
  review: IReview;
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
  cursor: pointer;
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

const RemoveBtn = styled(CiCircleRemove)`
  width: 30px;
  height: 30px;
  margin-left: 10px;
  cursor: pointer;
`;

export default function VisitReview({ review }: IProps) {
  const { bigImg, handleBigImg, userState, handleRemoveReview } =
    useEditReview(review);

  return (
    <>
      <Container>
        <Img
          src={review.imageUrl}
          alt="visit_img"
          onClick={() => handleBigImg(true)}
        />
        <Infos>
          <Info alignItems="center">
            {review.name}
            {userState.login && userState.userInfo.name === review.name && (
              <RemoveBtn
                onClick={() => {
                  handleRemoveReview(review._id);
                }}
              />
            )}
          </Info>
          <Info alignItems="start">{review.content}</Info>
          <Info alignItems="center">{review.date}</Info>
        </Infos>
      </Container>
      {bigImg && (
        <>
          <Overlay onClick={() => handleBigImg(false)} />
          <Modal src={review.imageUrl} alt="big_visit_img" />
        </>
      )}
    </>
  );
}
