import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useState } from "react";
import { logout } from "../utils/memberFunctions";
import { handleLogout } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useUserInfo() {
  const [show, setShow] = useState(false);
  const userState = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogout = async () => {
    const result = await logout();

    if (result.status === 205) {
      toast.success("로그아웃 했습니다.");
      navigate("/");

      setTimeout(() => {
        dispatch(handleLogout());
      }, 100);
    } else {
      toast.error("로그아웃에 실패했습니다.");
      return;
    }

    return;
  };

  const goToMypage = () => {
    navigate("/mypage");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToJoin = () => {
    navigate("/join");
  };

  return {
    show,
    setShow,
    userState,
    startLogout,
    goToMypage,
    goToLogin,
    goToJoin,
  };
}
