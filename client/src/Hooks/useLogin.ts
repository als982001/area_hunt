import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useForm } from "react-hook-form";
import { login } from "../utils/memberFunctions";
import { handleLogin } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { IAccount } from "../utils/types";

interface FormValues {
  userId: string;
  password: string;
}

export default function useLogin() {
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

  const startLogin = async (data: FormValues) => {
    const userInfo: IAccount | null = await login(data);

    if (userInfo === null) {
      alert("로그인에 실패했습니다.");
    } else {
      dispatch(handleLogin(userInfo));
      navigate("/");
    }
  };

  const checkValidAccess = () => {
    if (userState.login === true) {
      navigate("/list");
      return;
    }
  };

  return {
    userState,
    handleSubmit,
    control,
    startLogin,
    checkValidAccess,
  };
}
