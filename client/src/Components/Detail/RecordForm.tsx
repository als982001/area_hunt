import styled from "styled-components";

import SubmitButton from "../Global/Buttons/SubmitButton";
import {
  borderRadius20px,
  centerImage,
  contentInputStyle,
} from "../../styles/styles";
import { displayCenter, displayStartCenter } from "../../styles/displays";
import { defaultShadow } from "../../styles/shadows";
import usePostReview from "../../Hooks/usePostReview";

interface IProps {
  id: string;
}

const Form = styled.form`
  ${borderRadius20px}
  ${displayStartCenter}
  ${defaultShadow}

  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding: 10px;

  @media screen and (max-width: 450px) {
    flex-direction: column;
    height: auto;
  }
`;

const Img = styled.div<{ bgImage: string }>`
  ${borderRadius20px}
  ${defaultShadow}
  ${displayCenter}
  ${centerImage}
  
  width: 180px;
  height: 180px;
  padding: 2px;
  cursor: pointer;
  text-align: center;
`;

const ContentInput = styled.textarea`
  ${contentInputStyle}

  flex-grow: 1;
  margin: 0 30px;
  font-size: 15px;

  @media screen and (max-width: 450px) {
    margin: 30px 0;
  }
`;

export default function RecordForm(props: IProps) {
  const {
    handleSubmit,
    handlePostRecord,
    imageUrl,
    handleInputImage,
    register,
    imageInputRef,
    handleInputClick,
  } = usePostReview(props.id);

  return (
    <Form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handlePostRecord)}
    >
      <Img bgImage={imageUrl} onClick={handleInputClick}>
        {imageUrl.length === 0 && "클릭하여 이미지를 등록해주세요."}
      </Img>
      <input
        type="file"
        accept="image/*"
        onChange={handleInputImage}
        style={{ display: "none" }}
        ref={imageInputRef}
      />
      <ContentInput height="80%" {...register("content", { required: true })} />
      <SubmitButton width="120px" height="70px" fontSize="15px">
        작성
      </SubmitButton>
    </Form>
  );
}
