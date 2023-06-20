import styled from "styled-components";
import { displayCenter, displayStartA } from "../styles/displays";
import LoginLogo from "../Components/Global/Logos/LoginLogo";
import { useForm } from "react-hook-form";
import { handleStartLogin } from "../utils/MemberFunctions";
import LoginInput from "../Components/Global/Inputs/LoginInput";
import SubmitButton from "../Components/Global/Buttons/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { handleLogin } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

interface FormValues {
  userId: string;
  password: string;
}

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
      <Container onSubmit={handleSubmit(handleLoginStart)}>
        <LoginLogo logoSize={"100px"} />
        <Inputs>
          <LoginInput
            type="text"
            control={control}
            name="userId"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="ID를 입력하세요."
          />
          <LoginInput
            type="password"
            control={control}
            name="password"
            rules={{ required: true }}
            width="100%"
            height="40px"
            placeholder="비밀번호를 입력하세요."
          />
        </Inputs>
        <SubmitButton width="" height="" content="로그인" fontSize="17px" />
      </Container>
    </Wrapper>
  );
}
