import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";

import RegistInput from "../Components/Regist/RegistInput";
import Button from "../Components/Global/Buttons/Button";
import {
  displayCenter,
  displayCenterStart,
  gridCenter,
} from "../styles/displays";
import { handlePostItem } from "../utils/itemFunctions";
import { isLocal, localAreaImagePath } from "../utils/functions";
import {
  border1px,
  border2px,
  borderRadius20px,
  centerImage,
} from "../styles/styles";

interface FormValues {
  name: string;
  address: string;
  location: string;
  content: string;
}

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
  padding-bottom: 200px;
`;

const Form = styled.form`
  ${gridCenter}
  ${border2px}
  ${borderRadius20px}
  width: 70%;
  margin-top: 50px;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  justify-items: center;
  padding: 30px 10px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    gap: none;
  }
`;

const Image = styled.div<{ bgImage: string }>`
  ${displayCenter}
  ${centerImage}
  ${border1px}
  ${borderRadius20px}

  width: 80%;
  height: 500px;

  @media screen and (max-width: 1000px) {
    height: 300px;
  }
`;

const Inputs = styled.div`
  ${displayCenter}

  flex-direction: column;
  width: 80%;
  height: 500px;

  @media screen and (max-width: 1000px) {
    height: 300px;
  }
`;

export default function Regist() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(isLocal ? localAreaImagePath : "");

  const userState = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      address: "",
      location: "",
      content: "",
    },
    mode: "onChange",
  });

  const handleStartPost = async (data: FormValues) => {
    if (isLocal) {
      const success = await handlePostItem(
        imageUrl,
        data,
        userState.userInfo.userId
      );

      if (success) {
        alert("등록 완료");
        navigate("/list");
        return;
      } else {
        alert("등록 실패!!!");
        reset();
        return;
      }
    } else {
      if (image === null) {
        alert("이미지를 등록해주세요.");
        return;
      }

      const success = await handlePostItem(
        image,
        data,
        userState.userInfo.userId
      );

      if (success) {
        alert("등록 완료");
        navigate("/list");
        return;
      } else {
        alert("등록 실패!!!");
        reset();
        return;
      }
    }
  };

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  useEffect(() => {
    if (userState.login === false) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <Wrapper>
      <Form
        onSubmit={handleSubmit(handleStartPost)}
        encType="multipart/form-data"
      >
        <Image bgImage={imageUrl}>
          <input
            disabled={isLocal}
            type="file"
            accept="image/*"
            onChange={handleImagePost}
          />
        </Image>
        <Inputs>
          <RegistInput
            type="text"
            control={control}
            name="name"
            rules={{ required: true }}
            width="80%"
            height="40px"
            placeholder="이름을 입력하세요."
          />
          <RegistInput
            type="text"
            control={control}
            name="address"
            rules={{ required: true }}
            width="80%"
            height="40px"
            placeholder="주소을 입력하세요."
          />
          <RegistInput
            type="text"
            control={control}
            name="location"
            rules={{ required: true }}
            width="80%"
            height="40px"
            placeholder="간단한 위치를 입력하세요."
          />
          <RegistInput
            type="text"
            control={control}
            name="content"
            rules={{ required: true }}
            width="80%"
            height="40px"
            placeholder="간단한 소개 문구를 입력하세요."
          />
          <Button
            width="120px"
            height="40px"
            fontSize="14px"
            content="등록하기"
          />
        </Inputs>
      </Form>
    </Wrapper>
  );
}
