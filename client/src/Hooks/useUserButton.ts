import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { useState } from "react";
import { logout } from "../utils/memberFunctions";
import { handleLogout } from "../Redux/Actions";
import { useNavigate } from "react-router-dom";

export default function useUserInfo() {
  const [show, setShow] = useState(false);
  const userState = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogout = async () => {
    alert("로그아웃 했습니다.");

    const success = await logout();

    if (success) {
      dispatch(handleLogout());
      navigate("/");
    } else {
      alert("로그아웃에 실패했습니다.");
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
