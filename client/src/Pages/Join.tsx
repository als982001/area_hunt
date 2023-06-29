import styled from "styled-components";
import { displayCenter, displayCenterStart } from "../styles/displays";
import { useForm } from "react-hook-form";
import { handleJoin } from "../utils/MemberFunctions";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  AuthForm,
  border2px,
  borderRadius20px,
  centerImage,
} from "../styles/styles";
import AuthButton from "../Components/Auth/AuthButton";
import JoinInput from "../Components/Auth/JoinInput";

interface FormValues {
  userId: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  email: string;
}

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
  min-height: 100vh;
  padding-bottom: 100px;
`;

const Form = styled.form`
  ${AuthForm}
`;

const Title = styled.h4`
  font-size: 20px;
  line-height: 25px;
  font-weight: 600;
  text-align: center;
  color: #000;
  margin-bottom: 30px;
`;

const InputContainer = styled.section`
  ${displayCenter}
  position: relative;
`;

const JoinLink = styled.h4`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
`;

const Img = styled.div<{ bgImage: string }>`
  ${borderRadius20px}
  ${border2px}
  ${displayCenter}
  ${centerImage}
  
  width: 50%;
  height: 150px;
`;

export default function Join() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      userId: "",
      password: "",
      password2: "",
      name: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  const handleStartJoin = async (data: FormValues) => {
    if (image === null) {
      alert("이미지를 등록해주세요.");
      return;
    }

    const success = await handleJoin(image, data);

    if (success) {
      alert("회원가입에 성공했습니다.");
      navigate("/login");
      return;
    } else {
      alert("회원가입에 실패했습니다.");
    }

    return;
  };

  return (
    <Wrapper>
      <Form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleStartJoin)}
      >
        <Title>회원가입</Title>
        <InputContainer>
          <Img bgImage={imageUrl}>
            <input type="file" accept="image/*" onChange={handleImagePost} />
          </Img>
        </InputContainer>
        <InputContainer>
          <JoinInput
            type="text"
            control={control}
            name="userId"
            rules={{ required: true }}
            placeholder="ID를 입력하세요."
          />
        </InputContainer>
        <InputContainer>
          <JoinInput
            type="password"
            control={control}
            name="password"
            rules={{ required: true }}
            placeholder="비밀번호를 입력하세요."
          />
        </InputContainer>
        <InputContainer>
          <JoinInput
            type="password"
            control={control}
            name="password2"
            rules={{ required: true }}
            placeholder="비밀번호 확인을 위해 다시 입력하세요."
          />
        </InputContainer>
        <InputContainer>
          <JoinInput
            type="text"
            control={control}
            name="name"
            rules={{ required: true }}
            placeholder="이름을 입력하세요."
          />
        </InputContainer>
        <InputContainer>
          <JoinInput
            type="email"
            control={control}
            name="email"
            rules={{ required: true }}
            placeholder="이메일을 입력하세요."
          />
        </InputContainer>
        <InputContainer>
          <JoinInput
            type="tel"
            control={control}
            name="phone"
            rules={{ required: true }}
            placeholder="전화번호를 입력하세요."
          />
        </InputContainer>
        <div>
          <AuthButton>회원가입</AuthButton>
        </div>
        <Link to="/login">
          <JoinLink>계정이 있으신가요?</JoinLink>
        </Link>
      </Form>
    </Wrapper>
  );
}
