import { useRef, useState } from "react";
import {
  getImageUrl,
  getToday,
  isLocal,
  localReviewImagePath,
} from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RootState } from "../Redux/Stores";
import { useSelector } from "react-redux";
import { postRecord } from "../utils/itemFunctions";

interface FormValues {
  content: string;
}

export default function usePostReview(id: string) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(isLocal ? localReviewImagePath : "");

  const navigate = useNavigate();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const userState = useSelector((state: RootState) => state.userReducer);

  const handlePostRecord = async (data: FormValues) => {
    const { content } = data;
    const date = getToday();

    const info = {
      content,
      name: userState.userInfo.name,
      date,
    };

    if (image === null) {
      alert("이미지를 등록해주세요.");
      return;
    }

    const imageUrl = await getImageUrl(image.name, image);

    if (imageUrl) {
      const newRecord = {
        imageUrl,
        name: userState.userInfo.name,
        content,
        date,
      };

      const success = await postRecord(id, newRecord);

      if (success) {
        alert("등록 성공");
        window.location.reload();
      } else {
        alert("등록 실패!!!");
        reset();
      }
    } else {
      alert("이미지 업로드에 실패했습니다.");
      return;
    }

    return;
  };

  const handleInputImage = (event: any) => {
    if (event.target.file === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  const handleInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return {
    handleSubmit,
    handlePostRecord,
    imageUrl,
    handleInputImage,
    register,
    imageInputRef,
    handleInputClick,
  };
}
