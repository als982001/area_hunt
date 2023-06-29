import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { handleLogin } from "../Redux/Actions";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { handleStartLogin } from "../utils/MemberFunctions";
import { displayCenterStart } from "../styles/displays";
import LoginInput from "../Components/Auth/LoginInput";
import { AuthForm } from "../styles/styles";
import AuthButton from "../Components/Auth/AuthButton";

interface FormValues {
  userId: string;
  password: string;
}

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
  min-height: 100vh;
`;

const Form = styled.form`
  ${AuthForm}
`;

const Title = styled.h4`
  font-size: 20px;
  line-height: 25px;
  font-weight: 600;
  text-align: center;
  color: #000;
  margin-bottom: 30px;
`;

const InputContainer = styled.section`
  position: relative;
`;

const JoinLink = styled.h4`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
`;

export default function Login() {
  const userState = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      userId: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleLoginStart = async (data: FormValues) => {
    const userInfo: IAccount | null = await handleStartLogin(data);

    if (userInfo === null) {
      alert("로그인에 실패했습니다.");
    } else {
      dispatch(handleLogin(userInfo));
      navigate("/");
    }

    return;
  };

  useEffect(() => {
    if (userState.login === true) {
      navigate("/list");
      return;
    }
  }, []);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(handleLoginStart)}>
        <Title>로그인</Title>
        <InputContainer>
          <LoginInput
            type="text"
            placeholder="ID를 입력하세요."
            control={control}
            name="userId"
            rules={{ required: true }}
          />
        </InputContainer>
        <InputContainer>
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력하세요."
            control={control}
            name="password"
            rules={{ required: true }}
          />
        </InputContainer>
        <div>
          <AuthButton>로그인</AuthButton>
        </div>
        <Link to="/join">
          <JoinLink>계정이 없으신가요?</JoinLink>
        </Link>
      </Form>
    </Wrapper>
  );
}
