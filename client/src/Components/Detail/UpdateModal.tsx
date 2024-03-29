import styled from "styled-components";

import Button from "../Global/Buttons/Button";
import { borderRadius20px, centerImage } from "../../styles/styles";
import { fixedCenter } from "../../styles/positions";
import {
  displayCenter,
  displayStartCenter,
  gridCenter,
} from "../../styles/displays";
import { defaultShadow } from "../../styles/shadows";
import useUpdate from "../../Hooks/useUpdate";
import { IPlace } from "../../utils/types";

interface IProps {
  data: IPlace;
}

const Container = styled.form`
  ${borderRadius20px}
  ${gridCenter}
  ${fixedCenter}

  width: 60vw;
  height: 60vh;
  padding: 20px;
  background-color: white;
  z-index: 10;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-items: center;
  box-shadow: floralwhite 0px 19px 38px, ghostwhite 0px 15px 12px;

  @media screen and (max-width: 1000px) {
    width: 70vw;
    height: 80vh;
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    padding: 10px 0;
  }
`;

const Img = styled.div<{ bgImage: string }>`
  ${borderRadius20px}
  ${displayCenter}
  ${centerImage}
  ${defaultShadow}

  width: 100%;
  height: 100%;
  max-height: 100%;

  @media screen and (max-width: 450px) {
    width: 80%;
  }
`;

const Infos = styled.div`
  ${borderRadius20px}
  ${displayCenter}
  ${defaultShadow}

  width: 100%;
  height: 100%;
  flex-direction: column;

  @media screen and (max-width: 450px) {
    width: 80%;
    padding: 10px 0;
  }
`;

const InfoSpace = styled.div`
  ${displayStartCenter}
  width: 80%;
  max-height: 50px;
  margin: 20px 0;
  border-bottom: 1px solid gray;
`;

const Label = styled.label`
  ${displayStartCenter}

  width: 100px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

const Input = styled.input`
  ${displayStartCenter}
  width: 80%;
  height: 100%;
  font-size: 18px;
  font-weight: 400;
  border: none;
  outline: none;
`;

export default function UpdateModal({ data }: IProps) {
  const {
    handleSubmit,
    handleStartUpdate,
    imageUrl,
    handleImagePost,
    register,
    imageInputRef,
    handleInputClick,
  } = useUpdate(data);

  return (
    <Container
      encType="multipart/form-data"
      onSubmit={handleSubmit(handleStartUpdate)}
    >
      <Img bgImage={imageUrl} onClick={handleInputClick} />
      <input
        type="file"
        accept="image/&*"
        style={{ display: "none" }}
        onChange={handleImagePost}
        ref={imageInputRef}
      />
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
        <Button width="120px" height="40px" fontSize="18px">
          업데이트
        </Button>
      </Infos>
    </Container>
  );
}
