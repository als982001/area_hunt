import styled from "styled-components";
import useUserInfo from "../../../Hooks/useUserButton";
import { defaultShadow } from "../../../styles/shadows";

const Modal = styled.section`
  ${defaultShadow}
  width: 200px;
  height: 200px;
  position: fixed;
  background-color: whitesmoke;
  top: 90px;
  right: 50px;
  margin: 0 auto;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  z-index: 20;

  animation: userModalAnimation 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  @keyframes userModalAnimation {
    0% {
      transform: translateX(200px);
    }
    60% {
      transform: translateX(-15px);
    }
    80% {
      transform: translateX(8px);
    }
    100% {
      transform: translateX(0px);
    }
  }
`;

const Space = styled.section<{ isTop?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  border-bottom: ${(props) => props.isTop && "1px solid black"};
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 1px solid gray;
  background-color: black;
`;

const Name = styled.h4`
  font-size: 17px;
  font-weight: bold;
`;

const Choice = styled.section<{ isRight?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: ${(props) => props.isRight && "1px solid gray"};
  cursor: pointer;
  font-weight: bold;
`;

export default function AuthOptionsModal() {
  const { goToLogin, goToJoin } = useUserInfo();

  return (
    <Modal>
      <Space isTop={true}>
        <Icon />
        <Name>비회원</Name>
      </Space>
      <Space>
        <Choice onClick={goToJoin}>회원가입</Choice>
        <Choice isRight={true} onClick={goToLogin}>
          로그인
        </Choice>
      </Space>
    </Modal>
  );
}
