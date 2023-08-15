import { useRef, useState } from "react";
import { getImageUrl, getToday } from "../utils/functions";
import { useForm } from "react-hook-form";
import { RootState } from "../Redux/Stores";
import { useSelector } from "react-redux";
import { postReview } from "../utils/reviewFunctions";
import { toast } from "react-toastify";

interface FormValues {
  content: string;
}

export default function usePostReview(id: string) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const userState = useSelector((state: RootState) => state.userReducer);

  const handlePostRecord = async (data: FormValues) => {
    const { content } = data;
    const date = getToday();

    if (image === null) {
      toast("이미지를 등록해주세요.");
      return;
    }

    const imageUrl = await getImageUrl(image.name, image);

    if (!imageUrl) {
      toast("이미지 업로드에 실패했습니다.");
      return;
    }

    const newRecord = {
      imageUrl,
      name: userState.userInfo.name,
      content,
      date,
    };

    const result = await postReview(id, userState.userInfo._id, newRecord);

    if (result.status === 200) {
      toast.success(result.data);
      window.location.reload();
    } else {
      toast.error(result.data);
      reset();
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
