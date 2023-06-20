import styled from "styled-components";
import { border2px, borderRadius20px } from "../styles/styles";
import { useEffect, useState } from "react";
import { isLocal } from "../utils/functions";
import { AiFillWarning } from "react-icons/ai";
import {
  displayCenter,
  displayCenterStart,
  gridCenter,
} from "../styles/displays";
import { fixedCenter } from "../styles/positions";

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div<{ show?: boolean }>`
  ${gridCenter}

  width: 100%;
  height: 500px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Img = styled.img`
  ${borderRadius20px}

  width: 400px;
  height: 400px;

  @media screen and (max-width: 1000px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 600px) {
    width: 200px;
    height: 200px;
  }

  animation: slideIn 0.5s ease-in-out; // 애니메이션 적용
  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const Contents = styled.div`
  ${displayCenterStart}

  width: 400px;
  height: 400px;
  flex-direction: column;

  @media screen and (max-width: 1000px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Content = styled.h4`
  font-size: 17px;
  font-weight: 400;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Modal = styled.div`
  ${border2px}
  ${borderRadius20px}
  ${displayCenter}
  ${fixedCenter}
  
  width: 500px;
  height: 200px;
  padding: 20px;
  background-color: white;
  flex-direction: column;
  transition: all 3s linear;

  & span {
    font-size: 20px;
    font-weight: bold;
  }
`;

export default function Main() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let opacity = 1;

    const interval = setInterval(() => {
      opacity -= 0.1;

      if (opacity <= 0) {
        clearInterval(interval);
        setShow(false);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Container show={true}>
        <Contents>
          <Title>일상 속에서 새로움을 찾으시나요?</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            pharetra nunc nec quam egestas, a efficitur risus semper. Duis sed
            ornare eros. Vestibulum imperdiet feugiat mauris ac euismod. Etiam
            porta dignissim lobortis. Proin vitae sapien sodales, suscipit odio
            sit amet, euismod odio. Curabitur ultrices eu nisl at molestie. In
            auctor arcu mauris, blandit blandit lorem facilisis sed. Praesent
            ipsum augue, lobortis vitae leo dictum, tempus maximus leo. Mauris
            vulputate tellus non nisl venenatis, ac ornare est accumsan. Nam non
            velit viverra, mollis libero ut, molestie velit. Maecenas non justo
            mauris. Pellentesque in lacus velit. Vestibulum at tempus urna. Nam
            ut tincidunt est. Aenean nec est nisl.
          </Content>
        </Contents>
        <Img
          src="https://cdn.pixabay.com/photo/2015/02/21/04/22/hospital-643961_1280.jpg"
          alt="main_img_02"
        />
      </Container>
      <Container show={true}>
        <Img
          src="https://cdn.pixabay.com/photo/2020/04/21/14/19/contrast-5073265_1280.jpg"
          alt="main_img_03"
        />
        <Contents>
          <Title>나만 아는 일상 속 새로움을 공유해봐요!</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            pharetra nunc nec quam egestas, a efficitur risus semper. Duis sed
            ornare eros. Vestibulum imperdiet feugiat mauris ac euismod. Etiam
            porta dignissim lobortis. Proin vitae sapien sodales, suscipit odio
            sit amet, euismod odio. Curabitur ultrices eu nisl at molestie. In
            auctor arcu mauris, blandit blandit lorem facilisis sed. Praesent
            ipsum augue, lobortis vitae leo dictum, tempus maximus leo. Mauris
            vulputate tellus non nisl venenatis, ac ornare est accumsan. Nam non
            velit viverra, mollis libero ut, molestie velit. Maecenas non justo
            mauris. Pellentesque in lacus velit. Vestibulum at tempus urna. Nam
            ut tincidunt est. Aenean nec est nisl.
          </Content>
        </Contents>
      </Container>
      <Container show={true}>
        <Contents>
          <Title>모두 함께 일상을 바꿔봐요!</Title>
          <Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            pharetra nunc nec quam egestas, a efficitur risus semper. Duis sed
            ornare eros. Vestibulum imperdiet feugiat mauris ac euismod. Etiam
            porta dignissim lobortis. Proin vitae sapien sodales, suscipit odio
            sit amet, euismod odio. Curabitur ultrices eu nisl at molestie. In
            auctor arcu mauris, blandit blandit lorem facilisis sed. Praesent
            ipsum augue, lobortis vitae leo dictum, tempus maximus leo. Mauris
            vulputate tellus non nisl venenatis, ac ornare est accumsan. Nam non
            velit viverra, mollis libero ut, molestie velit. Maecenas non justo
            mauris. Pellentesque in lacus velit. Vestibulum at tempus urna. Nam
            ut tincidunt est. Aenean nec est nisl.
          </Content>
        </Contents>
        <Img
          src="https://cdn.pixabay.com/photo/2014/07/31/22/50/photographer-407068_1280.jpg"
          alt="main_img_01"
        />
      </Container>
      {isLocal && (
        <Modal style={{ opacity: show ? 1 : 0 }}>
          <AiFillWarning size={"50px"} />
          <span>현재 서버와 연결되어 있지 않습니다.</span>
          <span>로컬의 더미 데이터를 이용합니다.</span>
        </Modal>
      )}
    </Wrapper>
  );
}
