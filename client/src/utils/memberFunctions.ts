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

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
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

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
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
    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/user/logout`
    );

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data };
  }
};
