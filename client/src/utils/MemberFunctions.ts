import axios from "axios";
import { isLocal, localAreaImagePath } from "./functions";

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

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleJoin = async (image: File, joinInfo: IJoinInfo) => {
  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("userId", joinInfo.userId);
    formData.append("password", joinInfo.password);
    formData.append("name", joinInfo.name);
    formData.append("phone", joinInfo.phone);
    formData.append("email", joinInfo.email);

    const response = await axios.post(
      `${process.env.REACT_APP_BACK}/user/join`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const handleLoginCheck = async () => {
  try {
    if (isLocal) {
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK}/user/userInfo`
      );

      return response.data;
    }
  } catch (error: any) {
    console.log("Login status is invalid or the token has expired.");
    return null;
  }
};
