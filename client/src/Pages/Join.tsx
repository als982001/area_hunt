import styled from "styled-components";
import { displayCenter, displayCenterStart } from "../styles/displays";
import { useForm } from "react-hook-form";
import { handleJoin } from "../utils/MemberFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import JoinInput from "../Components/Global/Inputs/JoinInput";
import JoinLogo from "../Components/Global/Logos/JoinLogo";
import SubmitButton from "../Components/Global/Buttons/SubmitButton";

import {
  border1px,
  border2px,
  borderRadius20px,
  centerImage,
} from "../styles/styles";

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
`;

const Container = styled.form`
  ${displayCenter}
  ${border1px}
  ${borderRadius20px}

  width: 450px;
  margin-top: 60px;
  padding: 50px;
  flex-direction: column;
`;

const Inputs = styled.div`
  ${displayCenter}

  width: 100%;
  margin: 30px 0;
  flex-direction: column;
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
      <Container
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleStartJoin)}
      >
        <JoinLogo logoSize={"100px"} />
        <Inputs>
          <Img bgImage={imageUrl}>
            <input type="file" accept="image/*" onChange={handleImagePost} />
          </Img>
          <JoinInput
            type="text"
            control={control}
            name="userId"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="ID를 입력하세요."
          />
          <JoinInput
            type="password"
            control={control}
            name="password"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="비밀번호를 입력하세요."
          />
          <JoinInput
            type="password"
            control={control}
            name="password2"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="비밀번호 확인을 위해 다시 입력하세요."
          />
          <JoinInput
            type="text"
            control={control}
            name="name"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="이름을 입력하세요."
          />
          <JoinInput
            type="email"
            control={control}
            name="email"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="이메일을 입력하세요."
          />
          <JoinInput
            type="tel"
            control={control}
            name="phone"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="전화번호를 입력하세요."
          />
        </Inputs>
        <SubmitButton width="" height="" content="로그인" fontSize="17px" />
      </Container>
    </Wrapper>
  );
}
