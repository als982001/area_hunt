import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleJoin } from "../utils/memberFunctions";
import { getImageUrl } from "../utils/functions";
import { IJoinInfo } from "../utils/types";

interface FormValues {
  userId: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  email: string;
}

export default function useJoin() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      userId: "",
      password: "",
      password2: "",
      name: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
      return;
    }

    const imageFile = event.target.files[0];
    setImage((prev) => imageFile);
    setImageUrl((prev) => URL.createObjectURL(imageFile));
  };

  const handleStartJoin = async (data: FormValues) => {
    if (image === null) {
      alert("이미지를 등록해주세요.");
      return;
    }

    const accountImageUrl = await getImageUrl(image.name, image);

    if (accountImageUrl) {
      const newAccount: IJoinInfo = {
        imageUrl: accountImageUrl,
        name: data.name,
        userId: data.userId,
        password: data.password,
        phone: data.phone,
        email: data.email,
      };

      const success = await handleJoin(newAccount);

      if (success) {
        alert("회원가입에 성공했습니다.");
        navigate("/login");
        return;
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } else {
      alert("이미지 등록에 실패했습니다.");
      return;
    }

    return;
  };

  const handleInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return {
    handleStartJoin,
    imageUrl,
    handleSubmit,
    handleImagePost,
    control,
    imageInputRef,
    handleInputClick,
  };
}
