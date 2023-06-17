import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem } from "../utils/itemFunctions";
import VisitRecords from "../Components/Detail/VisitRecords";
import KakaoMap from "../Components/Detail/KakaoMap";
import { displayCenter } from "../styles/displays";
import { border2px, borderRadius20px } from "../styles/styles";
import MapImgToggle from "../Components/Detail/MapImgToggle";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Container = styled.div`
  margin-top: 50px;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Area = styled.div`
  width: 100%;
  height: 500px;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 2px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    width: 80%;
    padding: 50px 0;
  }
`;

const ImgOrMap = styled.div`
  width: 80%;
  height: 90%;
  ${displayCenter}
  ${border2px}
  ${borderRadius20px}
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
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

const Info = styled.h4`
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
`;

const SwitchSpace = styled.div`
  margin-top: 10px;
  ${displayCenter}
`;

interface IItem {
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
}

export default function Detail() {
  const [showMap, setShowMap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IItem | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleShowMap = () => {
    setShowMap((prev) => (prev === 1 ? 0 : 1));
  };

  useEffect(() => {
    const idPattern = /^[0-9]{1,}$/;

    if (id === undefined) {
      navigate("/notfound");
      return;
    }

    if (idPattern.test(id) === false) {
      navigate("/notfound");
      return;
    }
  }, [id]);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      if (id) {
        const result = await getItem(id);
        setData((prev) => result);

        if (result === null) {
          navigate("/notfound");
          return;
        }
      } else {
        navigate("/notfound");
        return;
      }

      setIsLoading((prev) => false);
    })();
  }, []);

  useEffect(() => {
    console.log(data?.image.path);
  }, [data]);

  return (
    <Wrapper>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container>
          <Area>
            <ImgOrMap>
              {showMap === 1 ? (
                <KakaoMap
                  width="100%"
                  height="100%"
                  address={data?.address}
                  name={data?.name}
                />
              ) : (
                <Img
                  src={
                    data?.image.path.includes("uploads")
                      ? `${process.env.REACT_APP_BACK}/${data?.image.path}`
                      : `${data?.image.path}`
                  }
                  alt="area_img"
                />
              )}
            </ImgOrMap>
            <Infos>
              <InfoSpace>
                <Label>이름</Label>
                <Info>{data?.name}</Info>
              </InfoSpace>
              <InfoSpace>
                <Label>주소</Label>
                <Info>{data?.address}</Info>
              </InfoSpace>
              <InfoSpace>
                <Label>위치</Label>
                <Info>{data?.location}</Info>
              </InfoSpace>
              <InfoSpace>
                <Label>내용</Label>
                <Info>{data?.content}</Info>
              </InfoSpace>
            </Infos>
          </Area>
          <SwitchSpace>
            <MapImgToggle onClick={handleShowMap} showMap={showMap} />
          </SwitchSpace>
          <VisitRecords id={id as string} />
        </Container>
      )}
    </Wrapper>
  );
}
