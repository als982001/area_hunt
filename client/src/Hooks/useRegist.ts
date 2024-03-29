import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getImageUrl, isRegionIncluded } from "../utils/functions";
import { useForm } from "react-hook-form";
import { RootState } from "../Redux/Stores";
import { postPlace } from "../utils/placeFunctions";
import { toast } from "react-toastify";

interface FormValues {
  name: string;
  address: string;
  location: string;
  content: string;
}

export default function useRegist() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

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

  const handlePostPlace = async (data: FormValues) => {
    if (userState.login === false) {
      toast.warning("로그인 후 이용 가능한 서비스입니다.");
      navigate("/login");
      return;
    }

    if (isRegionIncluded(data.address) === false) {
      toast.warning("서울, 경기, 충청 등 지역명을 포함해주세요.");
      return;
    }

    if (image === null) {
      toast.warning("이미지를 등록해주세요.");
      return;
    }

    const imageUrl = await getImageUrl(image.name, image);

    if (!imageUrl) {
      toast.error("이미지 업로드에 실패했습니다.");
      return;
    }

    const place = { ...data, imageUrl };

    const result = await postPlace(place, userState.userInfo._id);

    if (result.status === 200) {
      toast.success(result.data);
      navigate("/list");
      return;
    } else {
      toast.error(result.data);
      reset();
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
    handlePostPlace,
    imageUrl,
    handleImagePost,
    control,
    checkLogin,
    imageInputRef,
    handleInputClick,
  };
}
