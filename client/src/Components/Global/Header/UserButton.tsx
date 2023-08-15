import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import useUserInfo from "../../../Hooks/useUserButton";
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

const Overlay = styled.section`
  position: fixed;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 100vw;
  min-height: 100vh;
  height: auto;
  z-index: 10;
`;

export default function UserButton() {
  const { show, setShow, userState } = useUserInfo();

  return (
    <Container>
      <Button
        onClick={() => {
          setShow((prev) => !prev);
          console.log(userState);
        }}
      />
      {show && (
        <Overlay
          onClick={() => {
            setShow((prev) => false);
          }}
        >
          {userState.login ? <UserMenuModal /> : <AuthOptionsModal />}
        </Overlay>
      )}
    </Container>
  );
}
