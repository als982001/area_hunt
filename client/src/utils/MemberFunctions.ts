import axios from "axios";

type loginType = {
  userId: string;
  password: string;
};

interface IJoinInfo {
  userId: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  email: string;
}

export const handleStartLogin = async (loginInfo: loginType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/user/login`,
      {
        loginInfo,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleJoin = async (joinInfo: IJoinInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/user/join`,
      { joinInfo }
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const handleLoginCheck = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/user/userInfo`
    );

    return response.data;
  } catch (error: any) {
    console.log("Login status is invalid or the token has expired.");
    return null;
  }
};
