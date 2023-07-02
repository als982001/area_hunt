import styled from "styled-components";
import React, { useEffect } from "react";
import Spinner from "../Global/Spinner";

interface IProps {
  width: string;
  height: string;
  address?: string;
  name?: string;
  setShowMap?: React.Dispatch<React.SetStateAction<number>>;
}

const Map = styled.div<IProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export default function KakaoMap(props: IProps) {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

      // 주소-좌표 변환 객체를 생성
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색
      geocoder.addressSearch(
        props.address,
        function (result: any, status: any) {
          // 정상적으로 검색이 완료되었을 때
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );

            // 결과값으로 받은 위치를 마커로 표시
            const marker = new window.kakao.maps.Marker({
              map,
              position: coords,
            });

            // 운포윈도우로 장소에 대한 설명 표시
            const infowindow = new window.kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${props.name}</div>`,
            });
            infowindow.open(map, marker);

            // 지도와 중심을 결과값으로 받은 위치로 이동
            map.setCenter(coords);
          } else {
            // 정상적으로 주소강 입력되지 않았을 때
            alert("주소가 잘못 입력되었습니다!");

            if (props.setShowMap) {
              props.setShowMap(0);
            }
          }
        }
      );
    });
  }, []);

  return <Map id="map" width={props.width} height={props.height}></Map>;
}
