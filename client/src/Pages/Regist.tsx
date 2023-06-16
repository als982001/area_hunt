import { useForm } from "react-hook-form";
import styled from "styled-components";
import RegistInput from "../Components/Regist/RegistInput";
import Button from "../Components/Global/Buttons/Button";
import { displayCenter } from "../styles/displays";
import { useEffect, useState } from "react";
import { handlePostItem } from "../utils/itemFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { checkValidAddress } from "../utils/functions";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-bottom: 200px;
`;

const Form = styled.form`
  width: 70%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  justify-items: center;
  padding: 30px 10px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 2px solid black;

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    gap: none;
  }
`;

const Image = styled.div<IImage>`
  ${displayCenter}
  width: 80%;
  height: 500px;
  border: 1px solid black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;

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

interface FormValues {
  name: string;
  address: string;
  location: string;
  content: string;
}

interface IImage {
  bgImage: string;
}

export default function Regist() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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
    if (image === null) {
      alert("이미지를 등록해주세요.");
      return;
    }

    const { address } = data;

    const isValidAddress = await checkValidAddress(address);

    if (isValidAddress === false) {
      alert("주소가 유효하지 않습니다!");
      return;
    }

    const success = await handlePostItem(image, data);

    if (success) {
      alert("등록 완료");
      navigate("/list");
      return;
    } else {
      alert("등록 실패!!!");
      reset();
      return;
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
          <input type="file" accept="image/*" onChange={handleImagePost} />
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
