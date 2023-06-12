export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTH = "AUTH";

interface IUserInfo {
  userId: string;
  email: string;
  name: string;
  phone: string;
}

export const handleLogin = (userInfo: IUserInfo) => {
  return {
    type: LOGIN,
    payload: {
      userInfo,
    },
  };
};

export const handleLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const handleAuth = (userInfo: IUserInfo) => {
  return {
    type: AUTH,
    payload: {
      userInfo,
    },
  };
};
