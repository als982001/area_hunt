import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getImageUrl } from "../utils/functions";
import { IPlace } from "../utils/types";
import { updatePlace } from "../utils/placeFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Stores";
import { toast } from "react-toastify";

export default function useUpdate(data: IPlace) {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(data.imageUrl);

  const userState = useSelector((state: RootState) => state.userReducer);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data.name,
      address: data.address,
      location: data.location,
      content: data.content,
    },
  });

  const handleStartUpdate = async (event: { [key: string]: string }) => {
    if (image) {
      const newImageUrl = await getImageUrl(image.name, image);

      if (newImageUrl) {
        await setImageUrl(newImageUrl);
      } else {
        toast.error("이미지 업로드에 실패했습니다.");
        return;
      }
    }

    const updatedPlace: IPlace = {
      _id: data._id,
      imageUrl,
      name: event.name,
      address: event.address,
      location: event.location,
      content: event.content,
      publisherId: data.publisherId,
      reviews: data.reviews,
    };

    const result = await updatePlace(updatedPlace, userState.userInfo._id);

    if (result.status === 200) {
      window.location.reload();
    } else {
      toast.error(result.data);
    }

    return;
  };

  const handleImagePost = (event: any) => {
    if (event.target.files === null) {
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
    handleStartUpdate,
    imageUrl,
    handleImagePost,
    register,
    imageInputRef,
    handleInputClick,
  };
}
