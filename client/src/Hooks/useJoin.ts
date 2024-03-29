import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/functions";
import { IJoinInfo } from "../utils/types";
import { join } from "../utils/memberFunctions";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";

interface FormValues {
  userId: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  email: string;
}

interface IResult {
  status: number;
  data: string;
}

export default function useJoin() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const userState = useSelector((state: RootState) => state.userReducer);

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

  const handleJoin = async (data: FormValues) => {
    if (image === null) {
      toast.warning("이미지를 등록해주세요.");
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

      const result: IResult = await join(newAccount);

      if (result.status === 200) {
        toast.success(result.data);
        navigate("/login");
      } else {
        toast.error(result.data);
      }
    } else {
      toast.error("이미지 등록에 실패했습니다.");
      return;
    }

    return;
  };

  const handleInputClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const checkLogin = () => {
    if (userState.login === true) {
      navigate("/list");
    }
  };

  return {
    handleJoin,
    imageUrl,
    handleSubmit,
    handleImagePost,
    control,
    imageInputRef,
    handleInputClick,
    checkLogin,
  };
}
