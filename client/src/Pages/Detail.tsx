import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getItem } from "../utils/itemFunctions";
import VisitRecords from "../Components/Detail/VisitRecords";
import KakaoMap from "../Components/Detail/KakaoMap";
import {
  displayCenter,
  displayCenterStart,
  displayStartCenter,
  gridCenter,
} from "../styles/displays";
import { border2px, borderRadius20px } from "../styles/styles";
import MapImgToggle from "../Components/Detail/MapImgToggle";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import UpdateModal from "../Components/Detail/UpdateModal";

const Wrapper = styled.div`
  width: 100%;
  ${displayCenterStart}
`;

const Container = styled.div`
  margin-top: 50px;
  width: 70%;
  flex-direction: column;
  ${displayStartCenter}
`;

const Area = styled.div`
  ${gridCenter}
  ${borderRadius20px}
  ${border2px}
  width: 100%;
  height: 500px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
    width: 80%;
    padding: 50px 0;
  }
`;

const ImgOrMap = styled.div`
  ${displayCenter}
  ${border2px}
  ${borderRadius20px}

  width: 80%;
  height: 90%;
  overflow: hidden;
`;

const Img = styled.img`
  ${borderRadius20px}
  ${displayCenter}
  
  width: 100%;
  height: 100%;
  max-height: 100%;
`;

const Infos = styled.div`
  ${displayCenter}
  ${border2px}
  ${borderRadius20px}
  
  width: 80%;
  height: 90%;
  flex-direction: column;
`;

const InfoSpace = styled.div`
  ${displayStartCenter}

  width: 80%;
  height: 50px;
  margin: 20px 0;
  border-bottom: 2px solid gray;
`;

const Label = styled.label`
  ${displayStartCenter}

  width: 100px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const Info = styled.h4`
  ${displayStartCenter}

  height: 100%;
  font-size: 18px;
  font-weight: 400;
`;

const SettingButtons = styled.div`
  ${displayStartCenter}

  flex-direction: column;
`;

const SwitchSpace = styled.div`
  ${displayCenter}

  margin-top: 10px;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
`;

export default function Detail() {
  const [showMap, setShowMap] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IArea | null>(null);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const userState = useSelector((state: RootState) => state.userReducer);

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

  return (
    <>
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
                    setShowMap={setShowMap}
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
            <SettingButtons>
              <SwitchSpace>
                <MapImgToggle onClick={handleShowMap} showMap={showMap} />
              </SwitchSpace>
              {userState.login === true &&
                userState.userInfo.userId === data?.publisherId && (
                  <HiOutlinePencilAlt
                    onClick={() => {
                      setUpdate((prev) => true);
                    }}
                    style={{ marginTop: "20px", cursor: "pointer" }}
                    size={"35px"}
                  />
                )}
            </SettingButtons>
            <VisitRecords id={id as string} />
          </Container>
        )}
      </Wrapper>
      {update && (
        <>
          <Overlay onClick={() => setUpdate((prev) => false)} />
          <UpdateModal data={data as IArea} setUpdate={setUpdate} />
        </>
      )}
    </>
  );
}
