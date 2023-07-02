import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Stores";
import { useNavigate } from "react-router-dom";

import SubmitButton from "../Global/Buttons/SubmitButton";
import {
  borderRadius20px,
  centerImage,
  contentInputStyle,
} from "../../styles/styles";
import { getToday, isLocal, localReviewImagePath } from "../../utils/functions";
import { postRecord } from "../../utils/itemFunctions";
import { displayCenter, displayStartCenter } from "../../styles/displays";
import { defaultShadow } from "../../styles/shadows";

interface IProps {
  id: string | number;
}

interface FormValues {
  content: string;
}

const Form = styled.form`
  ${borderRadius20px}
  ${displayStartCenter}
  ${defaultShadow}

  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding: 10px;

  @media screen and (max-width: 600px) {
    height: 150px;
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

  @media screen and (max-width: 600px) {
    width: 70px;
    height: 70px;
  }
`;

const ContentInput = styled.textarea`
  ${contentInputStyle}

  flex-grow: 1;
  margin: 0 30px;
  font-size: 15px;
`;

export default function RecordForm(props: IProps) {
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState(
    isLocal ? localReviewImagePath : ""
  );

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const userState = useSelector((state: RootState) => state.userReducer);

  const handlePostRecord = async (data: FormValues) => {
    const { content } = data;
    const date = getToday();

    const info = {
      content,
      name: userState.userInfo.name,
      date,
    };

    if (isLocal) {
      const success = await postRecord(imagePath, props.id, info);

      if (success) {
        alert("등록 성공");

        navigate("/list");
      } else {
        alert("등록 실패!!!");
        reset();
      }
    } else {
      if (image === null) {
        alert("이미지를 등록해주세요.");
        return;
      }

      const success = await postRecord(image, props.id, info);

      if (success) {
        alert("등록 성공");
        window.location.reload();
      } else {
        alert("등록 실패!!!");
        reset();
      }
    }

    return;
  };

  const handleInputImage = (event: any) => {
    if (event.target.file === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImagePath((prev) => URL.createObjectURL(imageFile));
  };

  return (
    <Form
      encType="multipart/form-data"
      onSubmit={handleSubmit(handlePostRecord)}
    >
      <Img bgImage={imagePath}>
        {isLocal === false && (
          <input type="file" accept="image/*" onChange={handleInputImage} />
        )}
      </Img>
      <ContentInput height="80%" {...register("content", { required: true })} />
      <SubmitButton width="120px" height="70px" fontSize="15px">
        작성
      </SubmitButton>
    </Form>
  );
}
