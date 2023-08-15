import styled from "styled-components";

import { borderRadius20px, contentInputStyle } from "../../styles/styles";
import { displayStartCenter } from "../../styles/displays";
import { fixedCenter } from "../../styles/positions";
import { defaultShadow } from "../../styles/shadows";
import { IReview } from "../../utils/types";

import useEditReview from "../../Hooks/useEditReview";
import PencilButton from "../Global/Buttons/PencilButton";
import DeleteButton from "../Global/Buttons/DeleteButton";
import UpdateCircleButton from "../Global/Buttons/UpdateCircleButton";

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

const UpdateAndDelete = styled.section<{ update: boolean }>`
  width: 100px;
  display: flex;
  justify-content: ${(props) => (props.update ? "start" : "space-around")};
  margin-left: 10px;
`;

const UpdateInput = styled.textarea<{ width: string; height: string }>`
  ${contentInputStyle}
  margin-left: 20px;
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

export default function VisitReview({ review }: IProps) {
  const {
    bigImg,
    handleBigImg,
    userState,
    handleDeleteReview,
    update,
    setUpdate,
    updatedContent,
    setUpdatedContent,
    handleUpdateReview,
    imageInputRef,
    handleInputClick,
    handleImagePost,
    imageUrl,
  } = useEditReview(review);

  return (
    <>
      <Container>
        <Img
          src={imageUrl}
          alt="visit_img"
          onClick={() => {
            if (update) {
              handleInputClick();
            } else {
              handleBigImg(true);
            }
          }}
        />
        {update && (
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={imageInputRef}
            onChange={handleImagePost}
          />
        )}
        <Infos>
          <Info alignItems="center">
            {review.name}
            {userState.login &&
              userState.userInfo._id === review.reviewerId && (
                <UpdateAndDelete update={update}>
                  {update ? (
                    <UpdateCircleButton
                      onClick={() => {
                        handleUpdateReview();
                      }}
                      size={"20px"}
                    />
                  ) : (
                    <>
                      <PencilButton
                        onClick={() => {
                          setUpdate(true);
                        }}
                        size={"20px"}
                      />
                      <DeleteButton
                        onClick={() => {
                          handleDeleteReview(review._id);
                        }}
                        size={"20px"}
                      />
                    </>
                  )}
                </UpdateAndDelete>
              )}
          </Info>
          {update ? (
            <UpdateInput
              width="90%"
              height="100%"
              value={updatedContent}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setUpdatedContent(event.target.value);
              }}
            />
          ) : (
            <Info alignItems="start">{review.content}</Info>
          )}
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
