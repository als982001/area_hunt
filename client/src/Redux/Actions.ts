export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface IUSerInfo {
  userId: string;
  email: string;
}

export const handleLogin = (userInfo: IUSerInfo) => {
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
