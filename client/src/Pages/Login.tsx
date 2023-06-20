import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { handleLogin } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import LoginLogo from "../Components/Global/Logos/LoginLogo";
import LoginInput from "../Components/Global/Inputs/LoginInput";
import SubmitButton from "../Components/Global/Buttons/SubmitButton";
import { handleStartLogin } from "../utils/MemberFunctions";
import { border1px, borderRadius20px } from "../styles/styles";
import { displayCenter, displayCenterStart } from "../styles/displays";

interface FormValues {
  userId: string;
  password: string;
}

const Wrapper = styled.div`
  ${displayCenterStart}

  width: 100%;
  min-height: 100vh;
`;

const Container = styled.form`
  ${displayCenter}
  ${border1px}
  ${borderRadius20px}
  
  width: 450px;
  margin-top: 60px;
  padding: 50px;
  flex-direction: column;
`;

const Inputs = styled.div`
  ${displayCenter}

  width: 100%;
  margin: 30px 0;
  flex-direction: column;
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
