import styled from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../Global/Buttons/Button";
import { updateItem } from "../../utils/itemFunctions";
import { isLocal } from "../../utils/functions";
import { border2px, borderRadius20px, centerImage } from "../../styles/styles";
import { fixedCenter } from "../../styles/positions";
import {
  displayCenter,
  displayStartCenter,
  gridCenter,
} from "../../styles/displays";

interface IProps {
  data: IArea;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.form`
  ${borderRadius20px}
  ${gridCenter}
 ${border2px}
  ${fixedCenter}

  width: 60vw;
  height: 60vh;
  padding: 20px;
  background-color: white;
  z-index: 10;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;

const Img = styled.div<{ bgImage: string }>`
  ${borderRadius20px}
  ${displayCenter}
  ${centerImage}

  width: 100%;
  height: 100%;
  max-height: 100%;
`;

const Infos = styled.div`
  ${borderRadius20px}
  ${border2px}
  ${displayCenter}

  width: 80%;
  height: 90%;
  flex-direction: column;
`;

const InfoSpace = styled.div`
  ${displayStartCenter}
  width: 80%;
  height: 50px;
  margin: 20px 0;
  border-bottom: 1px solid gray;
`;

const Label = styled.label`
  ${displayStartCenter}

  width: 100px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  ${displayStartCenter}

  height: 100%;
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
