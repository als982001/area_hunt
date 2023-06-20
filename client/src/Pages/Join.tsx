import styled from "styled-components";
import { displayCenter, displayStartA } from "../styles/displays";
import { useForm } from "react-hook-form";
import JoinInput from "../Components/Global/Inputs/JoinInput";
import JoinLogo from "../Components/Global/Logos/JoinLogo";
import SubmitButton from "../Components/Global/Buttons/SubmitButton";
import { handleJoin } from "../utils/MemberFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLocal } from "../utils/functions";

const Wrapper = styled.div`
  ${displayStartA}
  width: 100%;
  min-height: 100vh;
`;

const Container = styled.form`
  ${displayCenter}
  flex-direction: column;
  width: 450px;
  margin-top: 60px;
  border-radius: 20px;
  border: 1px solid black;
  padding: 50px;
`;

const Inputs = styled.div`
  ${displayCenter}
  flex-direction: column;
  margin: 30px 0;
  width: 100%;
`;

const Img = styled.div<{ bgImage: string }>`
  width: 50%;
  height: 150px;
  border: 2px solid black;
  border-radius: 20px;
  ${displayCenter}
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const ImageInput = styled.input``;

interface FormValues {
  userId: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  email: string;
}

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
            <ImageInput
              type="file"
              accept="image/*"
              onChange={handleImagePost}
            />
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
