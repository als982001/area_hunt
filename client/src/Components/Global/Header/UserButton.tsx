import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import useUserInfo from "../../../Hooks/useUserButton";
import { defaultShadow } from "../../../styles/shadows";
import { centerImage } from "../../../styles/styles";
import UserMenuModal from "./UserMenuModal";
import AuthOptionsModal from "./AuthOptionsModal";

const Container = styled.section`
  position: relative;
`;

const Button = styled(BiUserCircle)`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Modal = styled.section`
  ${defaultShadow}
  width: 200px;
  height: 200px;
  position: absolute;
  background-color: whitesmoke;
  top: 60px;
  left: -75px;
  margin: 0 auto;
  border-radius: 20px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  z-index: 20;
`;

const Space = styled.section<{ isTop?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  border-bottom: ${(props) => props.isTop && "1px solid black"};
`;

const Icon = styled.div`
  ${centerImage}

  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 1px solid gray;
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

export default function UserButton() {
  const { show, setShow, userState, startLogout, goToMypage } = useUserInfo();

  return (
    <Container>
      <Button
        onClick={() => {
          setShow((prev) => !prev);
        }}
      />
      {show && (userState.login ? <UserMenuModal /> : <AuthOptionsModal />)}
    </Container>
  );
}
