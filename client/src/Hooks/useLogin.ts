import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useForm } from "react-hook-form";
import { handleStartLogin } from "../utils/MemberFunctions";
import { handleLogin } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";

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

  const handleLoginStart = async (data: FormValues) => {
    console.log(data);

    const userInfo: IAccount | null = await handleStartLogin(data);

    if (userInfo === null) {
      alert("로그인에 실패했습니다.");
    } else {
      dispatch(handleLogin(userInfo));
      navigate("/");
    }
  };

  const checkValidAccess = () => {
    console.log(userState);

    if (userState.login === true) {
      console.log("로그인 하셧네여");
      navigate("/list");
      return;
    }
  };

  return {
    userState,
    handleSubmit,
    control,
    handleLoginStart,
    checkValidAccess,
  };
}
