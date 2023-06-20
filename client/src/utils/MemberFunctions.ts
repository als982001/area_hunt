import axios from "axios";
import { isLocal, localAreaImagePath } from "./functions";
import { localAccounts } from "../Data/localAccounts";
import { join } from "path";

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
    if (isLocal) {
      const account: IAccount | undefined = localAccounts.find(
        (account) => account.userId === loginInfo.userId
      );

      if (account) {
        return { ...account, password: "몰루" };
      } else {
        return null;
      }
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK}/user/login`,
        {
          loginInfo,
        }
      );

      console.log(response.data);

      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleJoin = async (image: File, joinInfo: IJoinInfo) => {
  try {
    if (isLocal) {
      const newAccount = {
        id: localAccounts.length,
        userImg: {
          fieldname: "image",
          originalname: "user_image",
          encoding: "",
          mimetype: "image/jpeg",
          destination: "",
          filename: "user_image",
          path: localAreaImagePath,
          size: 0,
        },
        userId: joinInfo.userId,
        password: joinInfo.password,
        name: joinInfo.name,
        phone: joinInfo.phone,
        email: joinInfo.email,
      };

      localAccounts.push(newAccount);
      console.log(localAccounts);

      return true;
    } else {
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
    }
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
