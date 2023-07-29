import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getImageUrl,
  isLocal,
  isRegionIncluded,
  localAreaImagePath,
} from "../utils/functions";
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
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(isLocal ? localAreaImagePath : "");

  const userState = useSelector((state: RootState) => state.userReducer);

  const navigate = useNavigate();

  const imageInputRef = useRef<HTMLInputElement>(null);

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
    if (isRegionIncluded(data.address) === false) {
      alert("서울, 경기, 충청과 같은 지역명을 포함해주세요.");
      return;
    }

    if (image === null) {
      alert("이미지를 등록해주세요.");
      return;
    }

    const imageUrl = await getImageUrl(image.name, image);

    if (imageUrl) {
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
      alert("이미지 업로드에 실패했습니다.");
      return;
    }
  };

  const handleImagePost = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return {
    handleSubmit,
    handleStartPost,
    imageUrl,
    handleImagePost,
    control,
    checkLogin,
    imageInputRef,
    handleInputClick,
  };
}
