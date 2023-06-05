import axios from "axios";

type loginType = {
  userId: string;
  password: string;
};

export const handleLogin = async (loginInfo: loginType) => {
  try {
    const response = await axios.post("http://localhost:4000/user/login", {
      loginInfo,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
