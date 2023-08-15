import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
`;

export default function Test() {
  const notify = () => toast("Wow so easy!");

  return (
    <Wrapper>
      <button onClick={notify}>Notify!</button>
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={4000}
        hideProgressBar
      />
    </Wrapper>
  );
}
