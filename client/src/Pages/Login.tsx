import styled from "styled-components";
import { displayCenter, displayStartA } from "../styles/displays";
import Logo from "../Components/Global/Logo";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { handleLogin } from "../utils/MemberFunctions";

const Wrapper = styled.div`
  ${displayStartA}
  width: 100%;
  min-height: 100vh;
`;

const Container = styled.form`
  ${displayCenter}
  flex-direction: column;
  width: 450px;
  margin-top: 60px;
  border-radius: 20px;
  border: 1px solid black;
  padding: 50px;
`;

const Inputs = styled.div`
  ${displayCenter}
  flex-direction: column;
  margin: 30px 0;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  font-size: 17px;
  padding: 0.5em 2em;
  border: transparent;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  background: dodgerblue;
  color: white;
  border-radius: 4px;

  &:hover {
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(30, 144, 255, 1) 0%,
      rgba(0, 212, 255, 1) 100%
    );
  }
`;

export default function Login() {
  const { register, handleSubmit } = useForm();

  const handleStartLogin: SubmitHandler<FieldValues> = async (data) => {
    const { userId, password } = data;
    const result = await handleLogin({ userId, password });
    console.log(result);
  };

  return (
    <Wrapper>
      <Container onSubmit={handleSubmit(handleStartLogin)}>
        <Logo logoSize={"100px"} />
        <Inputs>
          <Input
            placeholder="ID를 입력하세요."
            {...register("userId", { required: true })}
          />
          <Input
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true })}
          />
        </Inputs>
        <Button>로그인</Button>
      </Container>
    </Wrapper>
  );
}
