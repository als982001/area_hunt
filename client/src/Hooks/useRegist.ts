import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLocal, localAreaImagePath } from "../utils/functions";
import { useForm } from "react-hook-form";
import { RootState } from "../Redux/Stores";
import { handlePostItem } from "../utils/itemFunctions";

interface FormValues {
  name: string;
  address: string;
  location: string;
  content: string;
}

export default function useRegist() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(isLocal ? localAreaImagePath : "");

  const userState = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      address: "",
      location: "",
      content: "",
    },
    mode: "onChange",
  });

  const handleStartPost = async (data: FormValues) => {
    if (isLocal) {
      const success = await handlePostItem(
        imageUrl,
        data,
        userState.userInfo.userId
      );

      if (success) {
        alert("등록 완료");
        navigate("/list");
        return;
      } else {
        alert("등록 실패!!!");
        reset();
        return;
      }
    } else {
      if (image === null) {
        alert("이미지를 등록해주세요.");
        return;
      }

      const success = await handlePostItem(
        image,
        data,
        userState.userInfo.userId
      );

      if (success) {
        alert("등록 완료");
        navigate("/list");
        return;
      } else {
        alert("등록 실패!!!");
        reset();
        return;
      }
    }
  };

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  const checkLogin = () => {
    if (userState.login === false) {
      navigate("/login");
      return;
    }
  };

  return {
    handleSubmit,
    handleStartPost,
    imageUrl,
    handleImagePost,
    control,
    checkLogin,
  };
}
