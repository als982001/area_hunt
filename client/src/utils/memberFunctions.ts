import axios from "axios";
import { IJoinInfo } from "./types";

type loginType = {
  userId: string;
  password: string;
};

export const login = async (loginInfo: loginType) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/user/login`,
      loginInfo,
      { withCredentials: true }
    );

    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const join = async (newAccount: IJoinInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/user/join`,
      newAccount,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error: any) {
    console.log(error);
    if (error.response.data) {
      alert(error.response.data);
    }
    return false;
  }
};

export const loginCheck = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACK}/user/userInfo`
    );

    return response.data;
  } catch (error: any) {
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_BACK}/user/logout`);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
