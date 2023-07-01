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
import { border2px, borderRadius20px, centerImage } from "../styles/styles";
import JoinInput from "../Components/Auth/JoinInput";
import { defaultShadow } from "../styles/shadows";

interface FormValues {
  name: string;
  address: string;
  location: string;
  content: string;
}

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
`;

const Form = styled.form`
  ${borderRadius20px}

  width: 800px;
  height: 500px;
  margin-top: 100px;
  background-color: #fff;
  padding: 15px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const InputContainer = styled.section`
  ${displayCenter}

  width: 100%;
  position: relative;
`;

const Img = styled.div<{ bgImage: string }>`
  ${borderRadius20px}
  ${displayCenter}
  ${centerImage}
  ${defaultShadow}
  
  width: 100%;
  height: 100%;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  align-items: center;
  justify-items: center;
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
        <InputContainer>
          <Img bgImage={imageUrl}>
            <input
              disabled={isLocal}
              type="file"
              accept="image/*"
              onChange={handleImagePost}
            />
          </Img>
        </InputContainer>
        <Inputs>
          <InputContainer>
            <RegistInput
              type="text"
              control={control}
              name="name"
              rules={{ required: true }}
              width="80%"
              height="40px"
              placeholder="이름을 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <RegistInput
              type="text"
              control={control}
              name="address"
              rules={{ required: true }}
              width="80%"
              height="40px"
              placeholder="주소을 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <RegistInput
              type="text"
              control={control}
              name="location"
              rules={{ required: true }}
              width="80%"
              height="40px"
              placeholder="간단한 위치를 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <RegistInput
              type="text"
              control={control}
              name="content"
              rules={{ required: true }}
              width="80%"
              height="40px"
              placeholder="간단한 소개 문구를 입력하세요."
            />
          </InputContainer>
          <div>
            <Button width="120px" height="40px" fontSize="14px">
              등록하기
            </Button>
          </div>
        </Inputs>
      </Form>
    </Wrapper>
  );
}
