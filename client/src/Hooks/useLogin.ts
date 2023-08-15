import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useForm } from "react-hook-form";
import { login } from "../utils/memberFunctions";
import { handleLogin } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { IAccount } from "../utils/types";
import { toast } from "react-toastify";

interface FormValues {
  userId: string;
  password: string;
}

interface IResult {
  status: Number;
  data: IAccount | String;
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
    const result: IResult = await login(data);

    if (result.status === 200) {
      dispatch(handleLogin(result.data as IAccount));
      navigate("/");
    } else {
      const errorMessage = result.data as string;
      toast.error(errorMessage);
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
