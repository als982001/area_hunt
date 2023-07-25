import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";

import RegistInput from "../Components/Regist/RegistInput";
import Button from "../Components/Global/Buttons/Button";
import { displayCenter, displayCenterStart } from "../styles/displays";
import { handlePostItem } from "../utils/itemFunctions";
import { isLocal, localAreaImagePath } from "../utils/functions";
import { borderRadius20px, centerImage } from "../styles/styles";
import { defaultShadow } from "../styles/shadows";
import useRegist from "../Hooks/useRegist";

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

  @media screen and (max-width: 1024px) {
    padding: 20px;
  }
`;

const Form = styled.form`
  ${borderRadius20px}

  width: 800px;
  min-height: 500px;
  margin-top: 100px;
  background-color: #fff;
  padding: 15px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media screen and (max-width: 1024px) {
    grid-template-columns: none;
    grid-template-rows: 2fr 1fr;
    gap: 10px;
    padding: 20px;
    margin-top: 0px;
  }
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
  const {
    handleSubmit,
    handleStartPost,
    imageUrl,
    handleImagePost,
    control,
    checkLogin,
  } = useRegist();

  useEffect(() => {
    checkLogin();
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
