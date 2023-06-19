import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../Global/Buttons/Button";
import { useEffect, useState } from "react";
import { updateItem } from "../../utils/itemFunctions";
import { isLocal, localAreaImagePath } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: {
    id: number;
    image: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    };
    name: string;
    address: string;
    location: string;
    content: string;
    publisherId: string;
  };
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.form`
  width: 60vw;
  height: 60vh;
  padding: 20px;
  background-color: white;
  border: 2px solid black;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
  z-index: 10;
  border-radius: ${(props) => props.theme.borderRadius};
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

const Img = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
`;

const Infos = styled.div`
  width: 80%;
  height: 90%;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoSpace = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 20px 0;
  border-bottom: 2px solid gray;
`;

const Label = styled.label`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  border: none;
  outline: none;
`;

export default function UpdateModal({ data, setUpdate }: IProps) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(data.image.path);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data.name,
      address: data.address,
      location: data.location,
      content: data.content,
    },
  });

  const handleStartUpdate = async (event: any) => {
    const { name, address, location, content } = event;

    const updatedInfo = {
      id: data.id,
      name,
      address,
      location,
      content,
      publisherId: data.publisherId,
    };

    if (isLocal) {
      const success = await updateItem(imageUrl, updatedInfo);

      if (success) {
        navigate("/list");
      } else {
        alert("정보가 업데이트되지 않았습니다.");
      }
    } else {
      if (image === null) {
        alert("이미지를 수정해주세요.");
        return;
      }

      const success = await updateItem(image, updatedInfo);

      if (success) {
        window.location.reload();
      } else {
        alert("정보가 업데이트되지 않았습니다.");
      }
    }

    return;
  };

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  return (
    <Container
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleStartUpdate)}
    >
      <Img
        bgImage={
          imageUrl.includes("uploads")
            ? `${process.env.REACT_APP_BACK}/${imageUrl}`
            : `${imageUrl}`
        }
      >
        <input type="file" accept="image/&*" onChange={handleImagePost} />
      </Img>
      <Infos>
        <InfoSpace>
          <Label>이름</Label>
          <Input
            placeholder="이름을 알려주세요."
            {...register("name", { required: true })}
          />
        </InfoSpace>
        <InfoSpace>
          <Label>주소</Label>
          <Input
            placeholder="주소를 알려주세요."
            {...register("address", { required: true })}
          />
        </InfoSpace>
        <InfoSpace>
          <Label>위치</Label>
          <Input
            placeholder="간략한 위치를 알려주세요."
            {...register("location", { required: true })}
          />
        </InfoSpace>
        <InfoSpace>
          <Label>내용</Label>
          <Input
            placeholder="간단한 소개글을 알려주세요."
            {...register("content", { required: true })}
          />
        </InfoSpace>
        <Button
          width="100px"
          height="40px"
          fontSize="18px"
          content="업데이트"
        />
      </Infos>
    </Container>
  );
}
